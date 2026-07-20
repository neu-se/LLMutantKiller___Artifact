import { Complex } from './complex';

describe('Complex', () => {
  it('should calculate asec correctly', () => {
    const complex = new Complex(2, 0);
    const result = complex.asec();
    expect(result).not.toBeNull();
    expect(result.re).not.toBeNaN();
    expect(result.im).not.toBeNaN();
  });
});