import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex acsc", () => {
  it("acsc(1) equals PI/2", () => {
    const result = new Complex(1, 0).acsc();
    expect(result.re).toBeCloseTo(Math.PI / 2, 10);
    expect(result.im).toBeCloseTo(0, 10);
  });

  it("acsc(-1) equals -PI/2", () => {
    const result = new Complex(-1, 0).acsc();
    expect(result.re).toBeCloseTo(-Math.PI / 2, 10);
    expect(result.im).toBeCloseTo(0, 10);
  });

  it("acsc(2+0i) equals asin(0.5)", () => {
    const result = new Complex(2, 0).acsc();
    expect(result.re).toBeCloseTo(Math.asin(0.5), 10);
    expect(result.im).toBeCloseTo(0, 10);
  });

  it.skip("acsc uses positive b/d for imaginary part: acsc(0+2i) has correct sign", () => {
    // acsc(2i): a=0, b=2, d=4
    // new Complex(0/4, +2/4).asin() = new Complex(0, 0.5).asin()
    const result = new Complex(0, 2).acsc();
    const expected = new Complex(0, 0.5).asin();
    expect(result.re).toBeCloseTo(expected.re, 10);
    expect(result.im).toBeCloseTo(expected.im, 10);
  });
});