import mongoose from "mongoose"
import Filter from 'bad-words';

const { Schema } = mongoose;

const gpuSchema = new Schema({
    chip_brand: String,
    manufacturer_brand: String,
    model: String,
    series: String,
    vram: String,
    memory_type: String,
    memory_speed: String,
    memory_bandwith: String,
    clock_speed: Number,
    clock_speed_max: Number,
    cores: Number,
    card_interface: String,
    video_out: String,
    hdmi_ver: String,
    dp_ver: String,
    pci_slots: Number,
    length: Number,
    width: Number,
    height: Number,
    size_unit: String,
    power_connector: String,
    power_usage: Number,
    cooling_type: String,
    fan_count: Number,
    led: Boolean,
    led_color: String,
    max_res: String,
    directx_ver: String,
    opengl_ver: String,
})

export const mdbGPU = mongoose.model('GPU', gpuSchema);

export class GPU {
    static async addGPU(gpu) {
        const filter = new Filter();
        Object.entries(gpu).forEach(([key, val]) => {
            if (typeof val === "string" || val instanceof String) {
                gpu[key] = filter.clean(val)
            }
        })

        const card = new mdbGPU(gpu)
        await mdbGPU.find({ model: gpu.model }).exec(async (err, storedGPU) => {
            if (storedGPU.length == 0) {
                await card.save();
            }
        });
        return card;
    }

    static async searchGPU(gpu) {
        return await mdbGPU.find(gpu);
    }
}