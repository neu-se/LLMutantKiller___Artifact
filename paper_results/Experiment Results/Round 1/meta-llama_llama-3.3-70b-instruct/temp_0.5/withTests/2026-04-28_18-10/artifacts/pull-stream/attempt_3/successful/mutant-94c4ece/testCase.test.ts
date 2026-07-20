import prop from "../../../../../../../../../../../subject_repositories/pull-stream/util/prop";

describe('prop function', () => {
  it('should return the first match when key is a RegExp', () => {
    const data = { foo: 'hello world' };
    const key = 'foo';
    const result = prop(key)(data);
    expect(result).toBe('hello world');
  });

  it('should return the match when key is a RegExp', () => {
    const data = 'hello world';
    const key = /world/;
    const originalProp = prop;
    const result = originalProp(key)(data);
    expect(result).toBeTruthy();
  });
});