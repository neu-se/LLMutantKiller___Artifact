import { Complex } from './complex.js';

describe("Complex", () => {
  it("should have a default export", () => {
    const complex = new Complex();
    expect(complex).toBeInstanceOf(Complex);
  });
});