import apiClient from "../../Components/Utils/apiClient";

export async function newProposal(data) {
  try {
    const { name, description } = data;
    const response = await apiClient.post(
      "/api/v1/proposal/generate-proposal",
      {
        name,
        description,
      }
    );
    return response.data.data;
  } catch (error) {
  }
}

export async function getUserProposals() {
  try {
    const response = await apiClient.get("/api/v1/proposal/my");
    const proposals = response.data.data;
    return proposals;
  } catch (error) {
    console.log("Fetch proposal Error : ", error);
  }
}
