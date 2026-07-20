import prop from '../../../../../../../../../../../subject_repositories/pull-stream/util/prop';

describe('prop function', () => {
  it('should return a function that returns the matched value when using a regexp', () => {
    const key = /a/;
    const data = 'abc';
    const result = prop(key)(data);
    expect(result).not.toBe(false);
  });
});