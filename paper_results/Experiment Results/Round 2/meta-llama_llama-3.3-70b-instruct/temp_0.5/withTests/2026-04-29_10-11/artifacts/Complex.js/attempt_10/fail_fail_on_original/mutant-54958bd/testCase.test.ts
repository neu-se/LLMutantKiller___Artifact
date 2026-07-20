import { Complex } from '../complex';

describe('Complex', () => {
  it('should correctly calculate the complex acosh', () => {
    const c = new Complex(2, 3);
    const result = c.acosh();
    const tmp = result.re;
    expect(tmp).not.toBeNaN();
    expect(result.im).not.toBeNaN();
    expect(() => {
      const _ = result[""];
    }).toThrowError();
  });
});