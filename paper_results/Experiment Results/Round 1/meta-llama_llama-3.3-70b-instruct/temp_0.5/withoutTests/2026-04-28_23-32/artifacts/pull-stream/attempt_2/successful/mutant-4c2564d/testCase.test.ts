import prop from "../../../../../../../../../../../subject_repositories/pull-stream/util/prop.js";

describe('prop function', () => {
  it('should return the matched string when using a RegExp key', () => {
    const data = 'hello world';
    const key = /hello/;
    const result = prop(key)(data);
    expect(result).not.toBe(true);
  });
});