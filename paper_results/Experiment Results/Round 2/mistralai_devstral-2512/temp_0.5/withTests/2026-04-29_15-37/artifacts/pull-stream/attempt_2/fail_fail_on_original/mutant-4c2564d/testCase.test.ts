import { prop } from "../../../../../../../../../../../subject_repositories/pull-stream/util/prop.js";

describe('prop function with regexp', () => {
  it('should return matched substring when using regexp key', () => {
    const testData = "hello world";
    const regex = /world/;
    const propFn = prop(regex);
    const result = propFn(testData);
    expect(result).toBe("world");
  });
});