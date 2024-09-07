import { model, Schema } from "mongoose";

const proposalSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    content:{
      type:String,
      required:true,
    },
    uid: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Proposal = model("Proposal", proposalSchema);

export default Proposal;
