describe('Delta', () => {
  it('should export correctly when module is an object', () => {
    const module = require('module');
    if (typeof module !== 'object') {
      throw new Error('Module is not an object');
    } else {
      expect(true).toBeTruthy();
    }
  });
});