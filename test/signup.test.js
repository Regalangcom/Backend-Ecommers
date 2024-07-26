const getCategoryWiseProduct = require('../controller/product/getCategoryWiseProduct');
const productModel = require('../models/productModel');


jest.mock('../models/productModel');
describe('getCategoryWiseProduct', () => {
    afterEach(() => {
      jest.restoreAllMocks(); // Membersihkan setiap penggantian setelah setiap pengujian
    });
  
    it('should return products for a valid category', async () => {
      const req = { query: { category: '3Second' } };
      const mockProducts = [{ productName: 'sd', category: '3Second' }];
  
      const res = {
        json: jest.fn(),
        status: jest.fn().mockReturnThis(),
      };
  
      jest.spyOn(productModel, 'find').mockResolvedValue(mockProducts);
  
      await getCategoryWiseProduct(req, res);
  
      expect(productModel.find).toHaveBeenCalledWith({ category: '3Second' });
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        data: mockProducts,
        message: 'Product',
        success: true,
        error: false,
      });
    });
  
    it('should handle errors when category is not provided', async () => {
        const req = { query: {} }; // Category not provided
        const res = {
          json: jest.fn(),
          status: jest.fn().mockReturnThis(),
        };
    
        await getCategoryWiseProduct(req, res);
    
        expect(productModel.find).not.toHaveBeenCalled(null); // Ensure productModel.find is not called
        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.json).toHaveBeenCalledWith({
          message: 'Category is required',
          error: true,
          success: false,
        });
      });
  
    it('should handle errors thrown by productModel.find', async () => {
      const req = { query: { category: '3Second' } };
      const res = {
        json: jest.fn(),
        status: jest.fn().mockReturnThis(),
      };
  
      const errorMessage = 'Database error';
      jest.spyOn(productModel, 'find').mockRejectedValue(new Error(errorMessage));
  
      await getCategoryWiseProduct(req, res);
  
      expect(productModel.find).toHaveBeenCalledWith({ category: '3Second' });
      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({
        message: errorMessage,
        error: true,
        success: false,
      });
    });
  });
  