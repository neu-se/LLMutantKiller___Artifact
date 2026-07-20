import { image } from "./index.js";

describe('image function', () => {
  it('should reject with a specific error message when options.url is missing', async () => {
    try {
      await image({ dest: '/some/destination' });
      fail('Expected promise to reject');
    } catch (error) {
      expect(error).toBeInstanceOf(Error);
      expect(error.message).toBe('The options.url is required');
    }
  });
});