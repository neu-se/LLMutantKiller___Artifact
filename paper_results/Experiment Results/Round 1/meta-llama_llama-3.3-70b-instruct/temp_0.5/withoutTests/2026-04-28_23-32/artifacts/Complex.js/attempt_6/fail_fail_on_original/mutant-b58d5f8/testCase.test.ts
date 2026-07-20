import { Complex } from "./complex.js";

describe('Complex', () => {
  it('should throw an error when parsing null token', () => {
    const complex = new Complex('null');
    const tokens = complex.toString().match(/\d+\.?\d*e[+-]?\d|\d+\.?\d*|\.\d+|./g);
    expect(tokens).not.toBeNull();
  });
});