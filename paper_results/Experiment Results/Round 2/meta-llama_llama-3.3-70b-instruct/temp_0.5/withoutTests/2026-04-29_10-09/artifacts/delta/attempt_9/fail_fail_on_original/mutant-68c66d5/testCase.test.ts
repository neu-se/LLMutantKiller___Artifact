const Delta = require('./Delta');

describe('Delta', () => {
  it('should export Delta as default and named export', () => {
    expect(typeof module.exports).toBe('object');
    expect(module.exports.default).toBeDefined();
    expect(typeof module.exports.default).toBe('function');
    expect(new module.exports.default()).toBeInstanceOf(Delta);
    expect(typeof module.exports).toBe('object');
    expect(module.exports.default).toBe(Delta);
    // Check if the module exports are defined when the condition is met
    if (typeof module === 'object') {
      expect(module.exports).toBeDefined();
    }
  });
});