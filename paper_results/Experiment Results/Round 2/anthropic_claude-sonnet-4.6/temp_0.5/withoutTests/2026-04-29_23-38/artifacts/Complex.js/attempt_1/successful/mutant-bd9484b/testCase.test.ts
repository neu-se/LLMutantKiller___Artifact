import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex acosh", () => {
  it("should correctly compute acosh(0) with im = i*pi/2", () => {
    const result = new Complex(0, 0).acosh();
    // acosh(0) = i * pi/2
    // Original code: res['im'] <= 0 handles the case where acos(0).im === 0
    // Mutated code: res['im'] < 0 misses the im === 0 case, giving wrong sign
    expect(result.re).toBeCloseTo(0, 10);
    expect(result.im).toBeCloseTo(Math.PI / 2, 10);
  });
});