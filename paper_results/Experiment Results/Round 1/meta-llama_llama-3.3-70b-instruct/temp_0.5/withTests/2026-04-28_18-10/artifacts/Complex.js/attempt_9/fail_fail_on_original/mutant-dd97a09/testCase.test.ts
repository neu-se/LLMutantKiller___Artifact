import { Complex } from "../complex.js";

describe('Complex', () => {
  it('should throw an error when sech is an empty function', () => {
    const complex = new Complex(1, 1);
    const sechFunction = complex.sech;
    expect(sechFunction.toString()).not.toBe('function () {}');
  });
});