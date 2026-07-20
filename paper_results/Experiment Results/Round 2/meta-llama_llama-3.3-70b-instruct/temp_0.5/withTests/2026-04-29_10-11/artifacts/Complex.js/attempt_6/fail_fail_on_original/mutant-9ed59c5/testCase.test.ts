jest.mock('../complex.js', () => ({
  __esModule: true,
  default: {},
  Complex: {},
}));

const fs = require('fs');
const path = require('path');

describe('Complex', () => {
  it('should export Complex as a module', () => {
    const complexPath = path.join(__dirname, '../complex.js');
    expect(fs.existsSync(complexPath)).toBe(true);
    const complex = require(complexPath);
    expect(complex).toBeDefined();
    expect(typeof complex).toBe('object');
    expect(complex.__esModule).toBe(true);
    expect(complex.default).toBeDefined();
    expect(complex.Complex).toBeDefined();
    expect(complex.default).toBe(complex.Complex);
    expect(complex.default.__esModule).toBe(true);
    expect(complex.default.__esModule).toBe(complex.Complex.__esModule);
    expect(complex.default).toEqual(complex.Complex);
    expect(complex.default.__esModule).toBe(true);
    expect(complex.default.__esModule).toBe(complex.Complex.__esModule);
    expect(complex.default.__esModule).toBe(true);
    expect(complex.default.__esModule).toBe(complex.Complex.__esModule);
    expect(complex.default.__esModule).toBe(true);
    expect(complex.default.__esModule).toBe(complex.Complex.__esModule);
    expect(complex.default.__esModule).toBe(true);
    expect(complex.default.__esModule).toBe(complex.Complex.__esModule);
    expect(complex.default.__esModule).toBe(true);
    expect(complex.default.__esModule).toBe(complex.Complex.__esModule);
    expect(complex.default.__esModule).toBe(true);
    expect(complex.default.__esModule).toBe(complex.Complex.__esModule);
    expect(complex.default.__esModule).toBe(true);
  });
});