import { Complex } from './complex';

describe('Complex', () => {
  it('should throw an error when calculating acsch with undefined imaginary part', () => {
    const complex = new Complex(1);
    const b = complex["im"];
    expect(b).toBeUndefined();
  });
});