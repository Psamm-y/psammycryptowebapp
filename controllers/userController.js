// @desc    Get user profile
// @route   GET /profile
// @access  Private
const getUserProfile = async (req, res) => {
  try {
    // req.user is set by the protect middleware
    const user = req.user;

    if (user) {
      res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        createdAt: user.createdAt,
      });
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error fetching profile' });
  }
};

module.exports = {
  getUserProfile,
};
