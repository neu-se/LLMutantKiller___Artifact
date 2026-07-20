import { Complex } from '../../complex';

describe('Complex', () => {
  it('should correctly calculate ceil with decimal places', () => {
    const complex = new Complex(1.2345, 6.789);
    const result = complex.ceil(3);
    expect(result.re).toBeCloseTo(1.235, 3);
    expect(result.im).toBeCloseTo(6.789, 3);
  });
});