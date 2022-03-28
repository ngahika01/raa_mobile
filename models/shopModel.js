import mongoose from "mongoose";

const shopSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    services: {
      type: Object,
      required: true,
    },
    location: {
      type: Object,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    phoneNumber: {
      type: String,
      required: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    
  },
  {
    timestamps: true,
  }
);

const Shop = mongoose.model("Shop", shopSchema);
export default Shop;
