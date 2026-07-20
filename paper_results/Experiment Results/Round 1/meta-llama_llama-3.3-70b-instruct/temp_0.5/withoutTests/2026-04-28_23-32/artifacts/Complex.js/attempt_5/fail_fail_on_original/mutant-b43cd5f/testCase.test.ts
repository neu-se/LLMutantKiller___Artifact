import { Complex } from "./complex.js";

describe('Complex', () => {
  it('should parse complex numbers correctly', () => {
    const complexWithNewline = new Complex('1+\n2i');
    expect(complexWithNewline.re).toBe(1);
    expect(complexWithNewline.im).toBe(2);
  });
});