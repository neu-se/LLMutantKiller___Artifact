import { Complex } from './complex';

describe('Complex', () => {
  it('should return a complex number when csch is called', () => {
    const complex = new Complex(1, 1);
    const result = complex.csch();
    expect(typeof result.re).toBe('number');
    expect(typeof result.im).toBe('number');
  });
});