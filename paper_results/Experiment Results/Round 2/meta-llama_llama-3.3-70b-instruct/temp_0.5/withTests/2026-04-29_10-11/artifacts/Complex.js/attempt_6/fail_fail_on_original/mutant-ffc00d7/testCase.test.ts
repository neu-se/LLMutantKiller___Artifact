const fs = require('fs');
const complexCode = fs.readFileSync('./complex.js', 'utf8');
eval(complexCode);

describe('Complex', () => {
  it('should correctly parse complex numbers from strings', () => {
    const complex = new Complex('1+1i');
    expect(complex.re).toBeCloseTo(1);
    expect(complex.im).toBeCloseTo(1);
  });

  it('should correctly parse complex numbers from strings with negative imaginary part', () => {
    const complex = new Complex('1-1i');
    expect(complex.re).toBeCloseTo(1);
    expect(complex.im).toBeCloseTo(-1);
  });

  it('should correctly parse complex numbers from strings with negative real part', () => {
    const complex = new Complex('-1+1i');
    expect(complex.re).toBeCloseTo(-1);
    expect(complex.im).toBeCloseTo(1);
  });

  it('should correctly parse complex numbers from strings with negative real and imaginary parts', () => {
    const complex = new Complex('-1-1i');
    expect(complex.re).toBeCloseTo(-1);
    expect(complex.im).toBeCloseTo(-1);
  });
});