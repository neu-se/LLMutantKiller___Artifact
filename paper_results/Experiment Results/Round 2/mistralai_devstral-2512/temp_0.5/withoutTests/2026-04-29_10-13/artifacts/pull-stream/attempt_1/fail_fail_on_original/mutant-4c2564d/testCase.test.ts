import { prop } from "../../../../../../../../../../../subject_repositories/pull-stream/util/prop.js";

describe('prop function with regex key', () => {
  it('should return the matched substring when using a regex key', () => {
    const regex = /world/;
    const data = "hello world";
    const getProp = prop(regex);
    const result = getProp(data);
    expect(result).toBe("world");
  });
});