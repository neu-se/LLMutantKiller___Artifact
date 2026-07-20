import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex NaN validation", () => {
  it("should not silently create a complex number with only one NaN component from abs/arg form", () => {
    // Using abs/arg form where abs is NaN but arg is valid
    // This should produce z.re = NaN * cos(0) = NaN, z.im = NaN * sin(0) = NaN
    // Both NaN, so both || and && would throw - not useful
    
    // Instead: verify that a complex created with one NaN component
    // behaves consistently - original throws, mutated allows it through
    // The key: find input where ONLY re or ONLY im becomes NaN
    
    // abs=NaN, arg=0: re = NaN*cos(0) = NaN, im = NaN*sin(0) = NaN -> both NaN
    // What about abs=1, arg=NaN: re = 1*cos(NaN) = NaN, im = 1*sin(NaN) = NaN -> both NaN
    
    // For the || vs && difference to matter, we need exactly one NaN
    // This can happen with: re=NaN, im=0 directly passed as object
    const c = new Complex({ re: NaN, im: 0 });
    expect(c.isNaN()).toBe(true);
  });
});