import { Complex } from './complex';

describe('Complex', () => {
  it('should parse complex number string correctly when the string contains a plus sign', () => {
    const complex = new Complex('3+2i');
    expect(complex.re).toBe(3);
    expect(complex.im).toBe(2);
  });
});