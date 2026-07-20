import prop from "../../../../../../../../../../../subject_repositories/pull-stream/util/prop.js";

describe('prop function', () => {
  it('should return the matched string when key is a RegExp', () => {
    const key = /hello/;
    const data = 'hello world';
    const result = prop(key)(data);
    expect(result).toBeTruthy();
  });
});