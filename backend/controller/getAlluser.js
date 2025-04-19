import User from "../database/model/schema.js";

export const getAllUser = async (req, res) => {
  const userId = req.user.userId;

  const model = await User.findById(userId);
  if (!model && !model.isAdmin) {
    return res.status(404).json({ message: "only admin are allowed " });
  }

  try {
    const user = await User.find().select("-password");

    res.status(200).json(user, "All user  are fetched ");
  } catch (error) {
    console.error("Error fetching user:", error);
    res.status(500).json({ message: "Failed to fetch user" });
  }
};
