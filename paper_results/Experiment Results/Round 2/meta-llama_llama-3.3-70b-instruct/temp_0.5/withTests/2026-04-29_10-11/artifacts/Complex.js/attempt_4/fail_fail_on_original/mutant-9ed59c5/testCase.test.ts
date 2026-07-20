const complex = require('./complex.js');

describe('Complex', () => {
  it('should export Complex as a module', () => {
    expect(complex.__esModule).toBe(true);
    expect(complex.default).toBe(complex.Complex);
    expect(complex.Complex).toBe(complex.default);
  });
});