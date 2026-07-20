import { Complex } from './complex';

describe('Complex', () => {
  it('should return a complex number when csch is called on a complex number', () => {
    const complex = new Complex(1, 1);
    const csch = complex.csch();
    expect(typeof csch.re).toBe('number');
    expect(typeof csch.im).toBe('number');
  });
});