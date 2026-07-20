import prop from "../../../../../../../../../../../subject_repositories/pull-stream/util/prop.js";

describe('prop function', () => {
  it('should behave differently for the original and mutated code', () => {
    const originalProp = prop('a');
    const originalData = { a: 'value' };
    expect(typeof originalProp(originalData)).toBe('string');

    const mutatedProp = prop('');
    expect(typeof mutatedProp).toBe('function');
  });
});