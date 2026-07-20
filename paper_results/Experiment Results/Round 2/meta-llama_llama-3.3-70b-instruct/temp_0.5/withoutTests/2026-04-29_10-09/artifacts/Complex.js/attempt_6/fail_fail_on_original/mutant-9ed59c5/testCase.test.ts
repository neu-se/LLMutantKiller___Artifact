const complex = require('./complex.js');

describe('Complex', () => {
  it('should define Complex', () => {
    expect(complex).toBeDefined();
  });

  it('should have a default export', () => {
    expect(complex.default).toBeDefined();
    expect(complex.Complex).toBeDefined();
    expect(complex.default).toBe(complex.Complex);
  });
});