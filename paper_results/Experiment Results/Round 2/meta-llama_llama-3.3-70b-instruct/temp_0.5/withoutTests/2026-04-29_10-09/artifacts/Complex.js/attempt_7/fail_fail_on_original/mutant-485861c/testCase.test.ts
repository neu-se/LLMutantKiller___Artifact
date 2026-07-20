import { Complex } from "./complex";

describe('Complex', () => {
  it('should handle null input correctly', () => {
    const complex = new Complex(null);
    expect(Object.keys(complex)).toEqual(['re', 'im']);
  });
});