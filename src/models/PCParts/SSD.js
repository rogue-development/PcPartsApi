import mongoose from "mongoose"
import Filter from 'bad-words'

const { Schema } = mongoose;

const ssdSchema = new Schema({
    brand: String,
    model: String,
    capacity: Number,
    capacity_unit: String,
    cache: Number,
    cache_unit: String,
    type: String,
    controller: String,
    properties: Array,
    interface: String,
    connector: String,
    power_usage_read: Number,
    power_usage_write: Number,
    power_usage_unit: String,
    time_between_failures: Number,
    time_between_failures_unit: String,
    max_guaranteed_bytes_writen: Number,
    max_guaranteed_bytes_writen_unit: String,
    drive_writes_per_day: Number,
    gb_per_day: Number,
    format: String,
    height: Number,
    height_unit: String,
    read_speed_sequential: Number,
    write_speed_sequential: Number,
    speed_sequential_unit: String,
    read_spead_random: Number,
    write_speed_random: Number,
    speed_random_unit: String,
    unique_features: Array
})

export const mdbSSD = mongoose.model('SSD', ssdSchema);

export class SSD {
    static async addSSD(ssd) {
        const filter = new Filter();
        Object.entries(ssd).forEach(([key, val]) => {
            if (typeof val === "string" || val instanceof String) {
                ssd[key] = filter.clean(val)
            }
        })

        const SSD = new mdbSSD(ssd);
        await mdbSSD.find({ model: ssd.model }).exec(async (err, storedSSD) => {
            if (storedSSD.length == 0) {
                await SSD.save();
            }
        });
        return SSD;
    }

    static async searchSSD(ssd) {
        return await mdbSSD.find(ssd);
    }

    static async getAll() {
        return await mdbSSD.find();
    }
}