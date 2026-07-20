import { prop } from "../../../../../../../../../../../subject_repositories/pull-stream/util/prop.js";

describe('prop function', () => {
  it('should return the original key when key is an object without exec function', () => {
    const key = {};
    const result = prop(key)({});
    expect(result).toBe(key);
  });
});