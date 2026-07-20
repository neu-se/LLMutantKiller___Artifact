import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex sub method with infinity", () => {
  it("should return NaN when subtracting complex(0, Infinity) from complex(Infinity, 0)", () => {
    // new Complex(Infinity, 0) is infinite, new Complex(0, Infinity) is infinite
    // Original first check &&: both infinite → true → NaN
    // Mutated first check ||: either infinite → true → NaN  
    // Both return NaN here, so this tests the unchanged behavior
    // The key: in original second check is ||, in mutated it's &&
    // new Complex(Infinity,0) - new Complex(1,0): 
    //   original: first && → false (second not infinite), second || → Infinity
    //   mutated: first || → true → NaN
    const result = new Complex(Infinity, 0).sub(new Complex(1, 0));
    expect(result.isInfinite()).toBe(true);
  });
});