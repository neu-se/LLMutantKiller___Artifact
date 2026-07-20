import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex acot", () => {
  it("should call atan with Infinity real part when d underflows with nonzero a", () => {
    const tiny = 1e-200;
    // Spy on atan to check what arguments it receives
    const originalAtan = Complex.prototype.atan;
    let atanCallArg: any = null;
    Complex.prototype.atan = function() {
      atanCallArg = { re: this.re, im: this.im };
      return originalAtan.call(this);
    };
    
    try {
      new Complex(tiny, tiny).acot();
      // Original: atan called with re=Infinity
      // Mutated:  atan called with re=0
      expect(atanCallArg.re).toBe(Infinity);
    } finally {
      Complex.prototype.atan = originalAtan;
    }
  });
});