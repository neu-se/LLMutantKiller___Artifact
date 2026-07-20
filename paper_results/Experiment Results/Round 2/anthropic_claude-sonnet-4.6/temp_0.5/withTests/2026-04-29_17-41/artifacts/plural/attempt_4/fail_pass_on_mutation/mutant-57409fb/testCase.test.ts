import plural from "../../../../../../../../../../../subject_repositories/plural/index.js";

describe('plural with no num argument', () => {
  it('should pluralize when no num argument is provided', () => {
    // When num is not passed, it is undefined
    // Original: num !== 1 || num === undefined => true || true => true (pluralize)
    // Mutated:  num !== 1 || false             => true || false => true (pluralize)
    // Both same... try num=1 explicitly to confirm singular
    expect(plural('test', 1)).toBe('test');
    // Now verify the function itself is exported correctly
    expect(typeof plural).toBe('function');
    expect(plural('cherry')).toBe('cherries');
    expect(plural('box', 0)).toBe('boxes');
  });
});