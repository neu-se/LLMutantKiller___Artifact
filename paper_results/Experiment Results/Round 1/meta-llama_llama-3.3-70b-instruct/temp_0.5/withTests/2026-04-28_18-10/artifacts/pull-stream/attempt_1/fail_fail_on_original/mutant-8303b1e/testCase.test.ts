import { prop } from "../../../../../../../../subject_repositories/pull-stream/util/prop.js";

describe('prop function', () => {
  it('should behave differently for the original and mutated code', () => {
    // Test case for the original code
    const originalProp = prop('a');
    const originalData = { a: 'value' };
    expect(originalProp(originalData)).toBe('value');

    // Test case for the mutated code
    const mutatedProp = prop('');
    const mutatedData = { a: 'value' };
    expect(mutatedProp(mutatedData)).toBe(undefined);
  });
});