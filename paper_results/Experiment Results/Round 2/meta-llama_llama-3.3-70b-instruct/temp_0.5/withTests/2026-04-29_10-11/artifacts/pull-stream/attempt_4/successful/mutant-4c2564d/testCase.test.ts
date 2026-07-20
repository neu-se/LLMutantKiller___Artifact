import { prop } from "../../../../../../../../../../../subject_repositories/pull-stream/util/prop.js";

describe('prop function', () => {
  it('should return the correct value when key is a string', () => {
    const data = { foo: 'bar' };
    const key = 'foo';
    const result = prop(key)(data);
    expect(result).toBe('bar');
  });

  it('should return the matched string when key is a regexp', () => {
    const data = 'hello world';
    const key = /world/;
    const result = prop(key)(data);
    expect(result).not.toBe(true);
  });
});