import prop from "../../../../../../../../../../../subject_repositories/pull-stream/util/prop.js";

describe('prop function', () => {
  it('should return the matched value when key is a regexp', () => {
    const data = { test: 'hello world' };
    const key = /world/;
    const result = prop(key)(data);
    expect(result).not.toBe(true);
  });
});