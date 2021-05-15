import mongoose from "mongoose";
import Filter from 'bad-words';

const { Schema } = mongoose;

const cpuSchema = new Schema({
    brand: String,
    model: String,
    base_clock: Number,
    boost_clock: Number,
    socket: String,
    cores: Number,
    threads: Number,
    hyperthreading: Boolean,
    TDP: Number,
    process: String,
    iGPU: Boolean,
    l1Cache: String,
    l2Cache: String,
    l3Cache: String,
})

export const mdbCPU = mongoose.model('CPU', cpuSchema);

export class CPU {
    static async addCPU(cpu) {
        const filter = new Filter();
        Object.entries(cpu).forEach(([key, val]) => {
            if (typeof val === "string" || val instanceof String) {
                cpu[key] = filter.clean(val)
            }
        })
        const processor = new mdbCPU(cpu);
        await mdbCPU.find({ model: cpu.model }).exec(async (err, storedCPU) => {
            if (storedCPU.length == 0) {
                await processor.save();
            }
        });
        return processor;
    }

    static async searchCPU(cpu) {
        return await mdbCPU.find(cpu);
    }
}