import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex module loads and basic operations work', () => {
  it('should be able to instantiate Complex and perform basic operations', () => {
    // If the mutation causes a syntax/parse issue or modifies the prototype object
    // by injecting `var b = this[""]` as actual code in the object literal,
    // this would fail
    const c = new Complex(3, 4);
    expect(c.re).toBe(3);
    expect(c.im).toBe(4);
    // Test that sech still works - the injected code might shadow 'sech' key
    const s = c['sech']();
    expect(s).toBeDefined();
    expect(typeof s.re).toBe('number');
  });
});