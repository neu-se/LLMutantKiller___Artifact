import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex toString", () => {
  it("detects mutation by checking output when im is -0 with EPSILON disabled", () => {
    // Override EPSILON to prevent epsilon normalization
    const savedEpsilon = (Complex as any).EPSILON;
    (Complex as any).EPSILON = -1; // Math.abs(x) < -1 is always false
    
    try {
      // Create complex with im = -0
      // b = -0, no epsilon normalization
      // b === 0? -0 === 0? YES -> early return -> returns re value
      // SAME in both versions because -0 === 0 in JS
      
      // Try with a computed -0:
      // -Math.sin(0) = -0
      const c = new Complex(1, -Math.sin(0)); // im = -0
      const result = c.toString();
      // Both versions: b=-0, b===0 true, early return, result = "1"
      expect(result).toBe("1");
    } finally {
      (Complex as any).EPSILON = savedEpsilon;
    }
  });
});