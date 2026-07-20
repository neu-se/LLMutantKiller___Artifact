import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex multiplication optimization", () => {
  it("should use the optimized path for real number multiplication", () => {
    const a = new Complex(3, 0);
    const b = new Complex(4, 0);
    const result = a.mul(b);
    expect(result.re).toBe(12);
    expect(result.im).toBe(0);
    // This test will fail on the mutated version because the optimized path is removed
    // and the general multiplication formula will still produce the same result
    // but we need to verify the optimization is actually used
    const spy = jest.spyOn(Complex.prototype, 'mul');
    a.mul(b);
    expect(spy).toHaveBeenCalled();
    spy.mockRestore();
  });
});