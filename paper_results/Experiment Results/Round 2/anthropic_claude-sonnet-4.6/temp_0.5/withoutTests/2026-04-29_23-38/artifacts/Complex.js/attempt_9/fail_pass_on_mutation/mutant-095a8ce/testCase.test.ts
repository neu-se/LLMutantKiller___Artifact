import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex acsc", () => {
  it("acsc of zero should produce Infinity imaginary part not a finite number", () => {
    const z = new Complex(0, 0);
    // Force call through the prototype chain
    const proto = Object.getPrototypeOf(z);
    const acsc = proto['acsc'];
    if (typeof acsc === 'function') {
      const result = acsc.call(z);
      expect(isFinite(result['im'])).toBe(false);
      expect(result['im']).toBeGreaterThan(0);
    } else {
      // If acsc doesn't exist, the mutation broke the object literal
      expect(typeof acsc).toBe('function');
    }
  });
});