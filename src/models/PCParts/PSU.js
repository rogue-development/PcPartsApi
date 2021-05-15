import mongoose from "mongoose"
import Filter from 'bad-words'

const { Schema } = mongoose;

const psuSchema = new Schema({
    brand: String,
    model: String,
    wattage: Number,
    rating: String,
    continuous_or_estimated: String,
    rail_12v: String,
    rail_12v_capacity: String,
    eu_certified: Boolean,
    connections_sata: Number,
    connections_molex: Number,
    connections_pcie: Number,
    connections_pcie_type: String,
    connections_cpu: Number,
    connections_cpu_type: String,
    connections_dual_8pin: Boolean,
    connections_modular: Boolean,
    cooling_fans: Number,
    cooling_fan_diameter: Number,
    cooling_fan_diameter_unit: String,
    cooling_type: String,
    protections: Array,
    time_between_failures: Number,
    time_between_failures_unit: String,
    height: Number,
    width: Number,
    lenght: Number,
    size_unit: String,
    color: String,
    unique_features: Array
})

export const mdbPSU = mongoose.model('PSU', psuSchema);

export class PSU {
    static async addPSU(psu) {
        const filter = new Filter();
        Object.entries(psu).forEach(([key, val]) => {
            if (typeof val === "string" || val instanceof String) {
                psu[key] = filter.clean(val)
            }
        })

        const powersupply = new mdbPSU(psu);
        await mdbPSU.find({ model: psu.model }).exec(async (err, storedPSU) => {
            if (storedPSU.length == 0) {
                await powersupply.save();
            }
        });
        return powersupply;
    }

    static async searchPSU(psu) {
        return await mdbPSU.find(psu);
    }
}