import { Complex } from "./complex.js";

describe('Complex', () => {
  it('should have a sech function with a body', () => {
    const complex = new Complex(1, 1);
    const sechFunction = complex.sech;
    expect(sechFunction).toBeInstanceOf(Function);
    const functionString = sechFunction.toString();
    expect(functionString).not.toContain('function () {}');
  });
});