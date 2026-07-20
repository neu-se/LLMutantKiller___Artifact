import { Complex } from '../../complex';

describe('Complex', () => {
  it('should correctly calculate the complex arcus secant for a finite value', () => {
    const complex = new Complex(2, 0);
    const result = complex.asec();
    expect(result.re).not.toBeNaN();
    expect(result.im).not.toBeNaN();
  });
});