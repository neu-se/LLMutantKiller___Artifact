const complex = require('./complex.js');

describe('Complex', () => {
  it('should define exports when using CommonJS', () => {
    expect(complex.__esModule).toBeDefined();
    expect(complex.default).toBeDefined();
    expect(complex.Complex).toBeDefined();
    expect(complex).toHaveProperty('default', complex);
    expect(complex).toHaveProperty('Complex', complex);
  });
});