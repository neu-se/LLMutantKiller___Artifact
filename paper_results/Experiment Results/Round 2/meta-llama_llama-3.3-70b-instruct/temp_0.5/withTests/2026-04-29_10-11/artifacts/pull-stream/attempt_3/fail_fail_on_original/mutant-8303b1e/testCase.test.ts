import { prop } from '../../../../../../../../subject_repositories/pull-stream/util/prop';

describe('prop function', () => {
  it('should behave correctly for the original and mutated code', () => {
    const key = "";
    const data = {};

    // In the original code, this should return the key itself
    // In the mutated code, this should return undefined
    expect(prop(key)(data)).toBe(key);
  });
});