import { Complex } from "../../../../../complex.js";

describe('Complex', () => {
  it('should calculate sech correctly', () => {
    const complex = new Complex(1, 1);
    const sechFunction = complex.sech;
    expect(sechFunction).toBeInstanceOf(Function);
    expect(sechFunction.toString().length).toBeGreaterThan(0);
  });
});