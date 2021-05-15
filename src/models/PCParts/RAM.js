import mongoose from "mongoose"
import Filter from 'bad-words'

const { Schema } = mongoose;

const ramSchema = new Schema({
    brand: String,
    model: String,
    memory_capacity: Number,
    memory_capacity_unit: String,
    memory_modules: Number,
    memory_module_size: Number,
    memory_module_size_unit: String,
    memory_type: String,
    memory_speed: Number,
    memory_speed_unit: String,
    low_voltage_ddr: Boolean,
    cas_latency: Number,
    true_latency: Number,
    true_latency_unit: String,
    voltage: Number,
    led: Boolean,
    led_color: String,
    unique_features: Array
})

export const mdbRAM = mongoose.model('RAM', ramSchema);

export class RAM {
    static async addRAM(ram) {
        const filter = new Filter();
        Object.entries(ram).forEach(([key, val]) => {
            if (typeof val === "string" || val instanceof String) {
                ram[key] = filter.clean(val)
            }
        })

        const RAM = new mdbRAM(ram);
        await mdbRAM.find({ model: ram.model }).exec(async (err, storedRAM) => {
            if (storedRAM.length == 0) {
                await RAM.save();
            }
        });
        return RAM;
    }

    static async searchRAM(ram) {
        return await mdbRAM.find(ram);
    }
}