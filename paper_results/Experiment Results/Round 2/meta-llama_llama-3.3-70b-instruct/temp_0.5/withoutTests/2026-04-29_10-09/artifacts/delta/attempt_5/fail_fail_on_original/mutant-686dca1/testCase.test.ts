describe('Delta', () => {
  it('should export correctly when module is an object', () => {
    const module = require('module');
    expect(() => {
      if (typeof module === 'object') {
        // This line should be executed when the module is an object
      } else {
        throw new Error('Module is not an object');
      }
    }).not.toThrow();
  });
});