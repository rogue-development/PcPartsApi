import mongoose from "mongoose"

export const CPU = mongoose.model('CPU', { name: String });
