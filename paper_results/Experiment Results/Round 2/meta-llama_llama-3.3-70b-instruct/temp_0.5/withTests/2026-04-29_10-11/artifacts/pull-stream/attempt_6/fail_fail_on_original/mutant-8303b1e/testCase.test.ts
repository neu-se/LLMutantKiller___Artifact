import { prop } from '../../../../../../../../subject_repositories/pull-stream/util/prop';

describe('prop function', () => {
  it('should behave correctly for the original and mutated code', () => {
    const key = "";
    const data = { test: 'value' };

    // In the original code, this should return the key itself
    // In the mutated code, this should return the result of key.exec(data)
    expect(prop(key)(data)).toBe(key);
  });
});