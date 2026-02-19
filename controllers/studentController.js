const User = require("../models/User");
const { ROADMAPS, buildRoadmapItems } = require("../config/roadmaps");

const calculateProgress = (completedItems, totalItems) => {
  if (!totalItems) return 0;
  return Math.round((completedItems / totalItems) * 100);
};

exports.getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    res.status(200).json({ success: true, data: user });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.selectDomain = async (req, res) => {
  try {
    const { selectedDomain, skillLevel } = req.body;

    if (!selectedDomain || !ROADMAPS[selectedDomain]) {
      return res.status(400).json({
        success: false,
        message: "Invalid domain selection"
      });
    }

    const update = { selectedDomain };
    if (skillLevel) update.skillLevel = skillLevel;

    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    if (user.selectedDomain !== selectedDomain) {
      update.completedRoadmapItems = [];
    }

    const updatedUser = await User.findByIdAndUpdate(req.user.id, update, {
      new: true
    }).select("-password");

    res.status(200).json({
      success: true,
      message: "Domain updated successfully",
      data: updatedUser
    });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

exports.getRoadmapProgress = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    if (!user.selectedDomain) {
      return res.status(200).json({
        success: true,
        data: {
          selectedDomain: null,
          progressPercentage: 0,
          roadmap: null,
          items: []
        }
      });
    }

    const roadmap = ROADMAPS[user.selectedDomain];
    const items = buildRoadmapItems(roadmap);
    const completedSet = new Set(user.completedRoadmapItems);
    const completedItems = items.filter((item) => completedSet.has(item.id));
    const progressPercentage = calculateProgress(completedItems.length, items.length);

    res.status(200).json({
      success: true,
      data: {
        selectedDomain: user.selectedDomain,
        skillLevel: user.skillLevel,
        progressPercentage,
        totalItems: items.length,
        completedCount: completedItems.length,
        roadmap,
        completedRoadmapItems: user.completedRoadmapItems
      }
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.toggleRoadmapItem = async (req, res) => {
  try {
    const { itemId } = req.body;
    if (!itemId) {
      return res.status(400).json({ success: false, message: "itemId is required" });
    }

    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    if (!user.selectedDomain) {
      return res.status(400).json({
        success: false,
        message: "Select a domain first"
      });
    }

    const items = buildRoadmapItems(ROADMAPS[user.selectedDomain]);
    const validItemIds = new Set(items.map((item) => item.id));

    if (!validItemIds.has(itemId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid roadmap item for selected domain"
      });
    }

    const completedSet = new Set(user.completedRoadmapItems);
    if (completedSet.has(itemId)) {
      completedSet.delete(itemId);
    } else {
      completedSet.add(itemId);
    }

    user.completedRoadmapItems = Array.from(completedSet);
    await user.save();

    const progressPercentage = calculateProgress(
      user.completedRoadmapItems.length,
      items.length
    );

    res.status(200).json({
      success: true,
      message: "Progress updated",
      data: {
        completedRoadmapItems: user.completedRoadmapItems,
        progressPercentage
      }
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
