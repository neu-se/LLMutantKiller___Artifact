const complex = require('./complex.js');

describe('Complex', () => {
  it('should have a default export when using CommonJS', () => {
    expect(complex).toBeDefined();
    expect(complex.default).toBeDefined();
    expect(complex.Complex).toBeDefined();
  });
});