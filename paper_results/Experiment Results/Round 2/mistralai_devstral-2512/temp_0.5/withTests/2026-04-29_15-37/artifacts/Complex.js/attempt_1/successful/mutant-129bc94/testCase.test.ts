// Test to detect the mutation in Complex.js
import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex.js mutation test', () => {
  it('should correctly expose the Complex constructor on the Complex object', () => {
    // The original code sets Complex['Complex'] = Complex
    // The mutated code sets Complex[""] = Complex
    // We test that the constructor is accessible via the expected property name
    expect(Complex['Complex']).toBeDefined();
    expect(Complex['Complex']).toBe(Complex);
  });
});