const userModel = require('../models/userModel');

const uploadProductPermission = async (userId) => {
    try {
        // Lakukan pengecekan apakah userId valid
        if (!userId) {
            throw new Error("Invalid user ID");
        }

        // Dapatkan data pengguna berdasarkan userId
        const user = await userModel.findById(userId);
        
        // Jika pengguna tidak ditemukan, kembalikan false
        if (!user) {
            throw new Error("User not found");
        }

        // Jika peran pengguna adalah 'ADMIN', izinkan pembaruan produk
        if (user.role === 'ADMIN') {
            return true;
        } else {
            return false;
        }
    } catch (error) {
        // Tangani kesalahan dengan baik dan kembalikan false jika terjadi kesalahan
        console.error("Error in uploadProductPermission:", error);
        return false;
    }
};

module.exports = uploadProductPermission;
