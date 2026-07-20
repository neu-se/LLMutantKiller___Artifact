import { prop } from '../../../../../../../../subject_repositories/pull-stream/util/prop';

describe('prop function', () => {
  it('should behave correctly for the original and mutated code', () => {
    const key = /test/;
    const data = 'test string';

    // In the original code, this should return 'test'
    // In the mutated code, this should return the key itself (/test/) because the condition "" === typeof key is true for a RegExp key
    expect(prop(key)(data)).not.toBe(key);
  });
});