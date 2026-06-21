import Link from "../models/link.model.js";
import User from "../models/user.model.js";

const getPublicProfileController = async (req, res) => {
  try {
    const { username } = req.params;

    const user = await User.findOne({
      username,
    });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    const links = await Link.find({ owner: user._id });

    res.status(200).json({
      success: true,
      username: user.username,
      links,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const trackLinkClickController = async (req, res) => {
  try {
    const { linkId } = req.params;

    const link = await Link.findById(linkId);

    if (!link) {
      return res.status(404).json({
        success: false,
        message: "Link not found",
      });
    }

    link.clicks += 1;

    await link.save();

    res.redirect(link.url);
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const getAnalyticsController = async (req, res) => {
  try {
    const links = await Link.find({
      owner: req.user._id,
    });

    const totalClicks = links.reduce((sum, link) => sum + link.clicks, 0);

    res.json({
      success: true,
      totalLinks: links.length,
      totalClicks,
      links,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

export {
  getPublicProfileController,
  trackLinkClickController,
  getAnalyticsController,
};
