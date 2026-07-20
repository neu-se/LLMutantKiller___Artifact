import { prop } from "../../../../../../../../../../../subject_repositories/pull-stream/util/prop.js";

describe('prop function', () => {
  it('should return the original key when key is an object without exec method', () => {
    const key = {};
    expect(prop(key)).toBe(key);
  });
});