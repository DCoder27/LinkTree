import Link from "../models/link.model.js";

const createLinkController = async (req, res) => {
  try {
    const { title, url } = req.body;

    const link = await Link.create({
      title,
      url,
      owner: req.user._id,
    });

    res.status(201).json({
      success: true,
      link,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

const getMyLinksController = async (req, res) => {
  try {
    const links = await Link.find({
      owner: req.user._id,
    });

    res.status(200).json({
      success: true,
      count: links.length,
      links,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

const updateLinkController = async (req, res) => {
  try {
    const id = req.params.id;
    const link = await Link.findById(id);

    if (!link) {
      return res.status(404).json({
        message: "Link not found",
      });
    }

    if (link.owner.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        message: "Forbidden",
      });
    }

    const updatedLink = await Link.findByIdAndUpdate(id, req.body, {
      new: true,
    });

    res.status(200).json(updatedLink);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const deleteLinkController = async (req, res) => {
  try {
    const id = req.params.id;
    const link = await Link.findById(id);

    if (!link) {
      return res.status(404).json({
        message: "Link not found",
      });
    }

    if (link.owner.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        message: "Forbidden",
      });
    }

    await link.deleteOne();

    res.status(200).json({
      success: true,
      message: "Link deleted",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

export {
  createLinkController,
  getMyLinksController,
  updateLinkController,
  deleteLinkController,
};
