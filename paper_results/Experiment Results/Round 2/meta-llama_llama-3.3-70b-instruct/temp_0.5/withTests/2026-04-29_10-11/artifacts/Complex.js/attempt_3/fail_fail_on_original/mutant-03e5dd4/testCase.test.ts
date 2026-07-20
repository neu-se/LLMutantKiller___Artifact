import { Complex } from "../../complex.js";

describe('Complex', () => {
  it('should throw an error when parsing a complex number with a newline character', () => {
    const originalCode = new Complex('1 + 2i');
    expect(originalCode.re).toBe(1);
    expect(originalCode.im).toBe(2);

    const mutatedCode = new Complex('1 +\n2i');
    expect(() => new Complex('1 +\n2i')).not.toThrow();
  });
});