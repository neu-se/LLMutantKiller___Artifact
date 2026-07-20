import { Complex } from './complex';

describe('Complex', () => {
  it('should correctly calculate the complex acosh and not throw an error when accessing the re property', () => {
    const c = new Complex(2, 3);
    const result = c.acosh();
    expect(result.re).not.toBeNaN();
    expect(result.im).not.toBeNaN();
    const tmp = result.re;
    expect(tmp).not.toBeNaN();
  });
});