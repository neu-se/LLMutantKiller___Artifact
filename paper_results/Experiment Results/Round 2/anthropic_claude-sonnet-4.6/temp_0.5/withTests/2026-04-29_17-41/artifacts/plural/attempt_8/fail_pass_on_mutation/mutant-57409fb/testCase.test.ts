import plural from "../../../../../../../../../../../subject_repositories/plural/index.js";

describe('plural', () => {
  it('should pluralize when num argument is missing entirely vs explicitly 1', () => {
    // Call with exactly 1 argument (num is undefined in function body)
    const args: [string] = ['test'];
    expect(plural.apply(null, args as any)).toBe('tests');
  });
});