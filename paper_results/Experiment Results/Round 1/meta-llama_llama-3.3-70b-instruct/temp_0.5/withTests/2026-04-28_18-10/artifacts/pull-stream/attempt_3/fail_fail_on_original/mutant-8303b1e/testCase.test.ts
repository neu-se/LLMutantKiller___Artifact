import { prop } from "../../../../../../../../subject_repositories/pull-stream/util/prop.js";

describe('prop function', () => {
  it('should behave differently for the original and mutated code', () => {
    const originalProp = prop('a');
    const originalData = { a: 'value' };
    expect(originalProp(originalData)).toBe('value');

    const mutatedProp = prop('');
    expect(() => mutatedProp({})).not.toThrowError();
  });
});