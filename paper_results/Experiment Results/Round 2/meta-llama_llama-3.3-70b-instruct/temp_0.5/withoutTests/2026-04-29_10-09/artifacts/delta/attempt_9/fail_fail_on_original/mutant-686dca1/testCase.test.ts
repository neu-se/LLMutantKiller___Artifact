describe('Delta', () => {
  it('should export correctly when module is an object', () => {
    const module = require('module');
    if (typeof module === 'object') {
      expect(true).toBeTruthy();
    } else {
      throw new Error('Module is not an object');
    }
  });
});