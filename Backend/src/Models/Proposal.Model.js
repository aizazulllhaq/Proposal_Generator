import { model, Schema } from "mongoose";

const proposalSchema = new Schema(
  {
    name: {
      type: String,
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
    },
  },
  {
    timestamps: true,
  }
);

const Proposal = model("Proposal", proposalSchema);

export default Proposal;
