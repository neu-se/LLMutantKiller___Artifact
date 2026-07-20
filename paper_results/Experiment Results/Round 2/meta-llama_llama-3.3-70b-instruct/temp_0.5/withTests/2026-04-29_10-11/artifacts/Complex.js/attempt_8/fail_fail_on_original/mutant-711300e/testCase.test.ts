import { Complex } from '../complex.js';

describe('Complex', () => {
  it('should throw an error when creating a Complex object with an object that has only "im" property but not "re" property', () => {
    expect(() => new Complex({ im: 1 })).toThrow();
    expect(() => new Complex({ re: 1 })).toThrow();
    expect(() => new Complex({ re: 1, im: 1 })).not.toThrow();
    expect(new Complex({ re: 0, im: 1 }).re).toBe(0);
    expect(new Complex({ re: 0, im: 1 }).im).toBe(1);
  });
});