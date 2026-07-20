import Delta from './Delta';

describe('Delta', () => {
  it('should be able to create an instance and check exports', () => {
    const delta = new Delta();
    expect(delta).toBeDefined();
    const module = require('./Delta');
    expect(module).toBeDefined();
    expect(module.exports).toBeDefined();
    expect(module.exports.default).toBeDefined();
  });
});