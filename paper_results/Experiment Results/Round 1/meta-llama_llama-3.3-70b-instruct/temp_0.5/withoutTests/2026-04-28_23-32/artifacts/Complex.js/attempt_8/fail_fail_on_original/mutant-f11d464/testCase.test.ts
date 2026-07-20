import { Complex } from '../../complex';

describe('Complex', () => {
  it('should correctly handle fully imaginary base in pow function', () => {
    const complex = new Complex(0, 1);
    const result = complex['pow'](2);
    expect(result['re']).toBeCloseTo(-1);
    expect(result['im']).toBeCloseTo(0);
  });
});