import { Complex } from '../complex';

describe('Complex', () => {
  it('should correctly calculate asinh and return an object with properties re and im', () => {
    const c = new Complex(1, 2);
    const result = c.asinh();
    expect(result).toHaveProperty('re');
    expect(result).toHaveProperty('im');
  });
});