import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex', () => {
  it('should parse null correctly and have no extra properties', () => {
    const z = { 're': 0, 'im': 0 };
    // Test that creating from null gives proper zero with no "" property
    const c = new Complex(null as any);
    const keys = Object.keys(c);
    expect(keys).not.toContain('');
  });
});