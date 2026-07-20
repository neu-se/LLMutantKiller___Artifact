import { prop } from "../../../../../../../../../../../subject_repositories/pull-stream/util/prop.js";

describe('prop function', () => {
  it('should return true when key is a regexp and data matches', () => {
    const data = { test: 'hello world' };
    const key = /world/;
    const result = prop(key)(data);
    expect(result).not.toBe(true);
  });
});