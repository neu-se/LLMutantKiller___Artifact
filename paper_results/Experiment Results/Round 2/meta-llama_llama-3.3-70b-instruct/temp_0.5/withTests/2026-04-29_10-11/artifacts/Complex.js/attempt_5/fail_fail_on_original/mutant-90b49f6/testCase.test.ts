import { Complex } from './complex';

describe('Complex', () => {
  it('should parse complex string with minus sign correctly', () => {
    const complex = new Complex('-3+4i');
    expect(complex.re).toBe(-3);
    expect(complex.im).toBe(4);
    const complex2 = new Complex('3-4i');
    expect(complex2.re).toBe(3);
    expect(complex2.im).toBe(-4);
  });
});