import prop = require('../../../../../../../../../../../subject_repositories/pull-stream/util/prop.js');

describe('prop', () => {
  it('should return a function that executes regexp on data when given a regexp key', () => {
    const regexp = /hello/;
    const getter = prop(regexp);

    // Original: returns a function wrapping regexp.exec
    // Mutated: returns the regexp itself (not a function), because the branch becomes false
    expect(typeof getter).toBe('function');

    // The function should return the matched string
    expect(getter('hello world')).toBe('hello');

    // The function should return null/falsy when no match
    expect(getter('goodbye world')).toBeFalsy();
  });
});