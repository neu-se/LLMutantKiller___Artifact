const complex = require('./complex.js');

describe('Complex.js', () => {
  it('should have the __esModule property defined', () => {
    expect(Object.keys(complex)).toContain('__esModule');
    expect(complex.__esModule).toBe(true);
  });
});