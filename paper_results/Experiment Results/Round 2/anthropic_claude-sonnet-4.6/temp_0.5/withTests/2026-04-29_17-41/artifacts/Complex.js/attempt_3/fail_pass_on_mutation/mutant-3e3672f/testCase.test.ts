import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex string parsing", () => {
  it("should parse imaginary unit with uppercase I in a string like '2I'", () => {
    let result: InstanceType<typeof Complex>;
    expect(() => {
      result = new Complex("2I");
    }).not.toThrow();
    expect(result!.re).toBe(0);
    expect(result!.im).toBe(2);
  });
});