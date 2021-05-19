import mongoose from "mongoose"
import Filter from 'bad-words'

const { Schema } = mongoose;

const hddSchema = new Schema({
    brand: String,
    model: String,
    capacity: Number,
    capacity_unit: String,
    interface: String,
    harddrive_bay: Number,
    harddrive_bay_unit: String,
    height: Number,
    size_unit: String,
    read_speed_sequential: Number,
    write_speed_sequential: Number,
    speed_sequential_unit: String,
    rotation_speed: Number,
    cache: Number,
    cache_unit: String,
    properties: Array,
    power_usage_read: Number,
    power_usage_write: Number,
    power_usage_idle: Number,
    power_usage_unit: String,
    unique_features: Array
})

export const mdbHDD = mongoose.model('HDD', hddSchema);

export class HDD {
    static async addHDD(hdd) {
        const filter = new Filter();
        Object.entries(hdd).forEach(([key, val]) => {
            if (typeof val === "string" || val instanceof String) {
                hdd[key] = filter.clean(val)
            }
        })

        const harddrive = new mdbHDD(hdd);
        await mdbHDD.find({ model: hdd.model }).exec(async (err, storedHDD) => {
            if (storedHDD.length == 0) {
                await harddrive.save();
            }
        });
        return harddrive;
    }

    static async searchHDD(hdd) {
        return await mdbHDD.find(HDD);
    }

    static async getAll() {
        return await mdbHDD.find();
    }
}