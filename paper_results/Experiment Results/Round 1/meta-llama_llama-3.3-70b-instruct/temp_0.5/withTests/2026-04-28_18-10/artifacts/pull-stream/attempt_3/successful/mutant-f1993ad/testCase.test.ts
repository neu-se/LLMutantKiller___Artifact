import prop from "../../../../../../../../../../../subject_repositories/pull-stream/util/prop";

describe('prop function', () => {
  it('should return a function that returns the matched value when key is a regexp', () => {
    const data = 'hello world';
    const key = /world/;
    const result = prop(key)(data);
    expect(result).toBe('world');
  });
});