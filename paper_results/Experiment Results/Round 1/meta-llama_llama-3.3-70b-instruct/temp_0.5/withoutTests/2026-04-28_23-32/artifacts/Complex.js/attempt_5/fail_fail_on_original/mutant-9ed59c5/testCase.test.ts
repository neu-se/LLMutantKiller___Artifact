const complex = require('./complex.js');

describe('Complex', () => {
  it('should have module.exports defined when using CommonJS', () => {
    expect(complex).toBeDefined();
    expect(complex.__esModule).toBeDefined();
    expect(complex.default).toBeDefined();
    expect(complex.Complex).toBeDefined();
  });
});