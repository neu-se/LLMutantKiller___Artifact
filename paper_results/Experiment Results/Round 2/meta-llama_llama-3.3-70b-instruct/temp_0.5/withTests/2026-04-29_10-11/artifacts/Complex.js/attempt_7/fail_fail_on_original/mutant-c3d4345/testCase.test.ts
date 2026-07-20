import { Complex } from './complex';

describe('Complex', () => {
  it('should throw an error when asec is called with a = 0 and b = 0', () => {
    const complex = new Complex(0, 0);
    expect(() => complex.asec()).toThrow();
  });
});