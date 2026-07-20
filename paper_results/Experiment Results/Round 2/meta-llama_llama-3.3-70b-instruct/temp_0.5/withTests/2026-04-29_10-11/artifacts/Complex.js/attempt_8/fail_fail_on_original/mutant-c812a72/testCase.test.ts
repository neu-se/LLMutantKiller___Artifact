import { Complex } from './complex.js';

describe('Complex', () => {
  it('should round correctly with a valid number of decimal places', () => {
    const complex = new Complex(1.2345, 6.789);
    const rounded = complex.round(2);
    expect(rounded.re).toBeCloseTo(1.23, 2);
    expect(rounded.im).toBeCloseTo(6.79, 2);
  });

  it('should round to a finite number when places is a boolean value in the mutated code', () => {
    const complex = new Complex(1.2345, 6.789);
    const rounded = complex.round(true);
    expect(isFinite(rounded.re)).toBe(true);
    expect(isFinite(rounded.im)).toBe(true);
  });
});