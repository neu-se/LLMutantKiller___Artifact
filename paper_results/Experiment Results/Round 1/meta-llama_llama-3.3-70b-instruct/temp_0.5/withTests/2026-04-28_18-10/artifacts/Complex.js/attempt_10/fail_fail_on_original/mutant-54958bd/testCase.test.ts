import { Complex } from './complex';

describe('Complex', () => {
  it('should not throw an error when calculating acosh', () => {
    const complex = new Complex(1, 0);
    const result = complex.acosh();
    expect(result.re).not.toBeNaN();
    expect(result.im).not.toBeNaN();
  });
});