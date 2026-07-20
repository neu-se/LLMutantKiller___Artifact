import { Complex } from './complex';

describe('Complex', () => {
  it('should parse complex numbers correctly', () => {
    const complex = new Complex('1+2i');
    expect(complex.re).toBe(1);
    expect(complex.im).toBe(2);
  });
});