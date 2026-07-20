import { prop } from "../../../../../../../../../../../subject_repositories/pull-stream/util/prop.js";

describe('prop function with regex key', () => {
  it('should return the first match when using a regex key', () => {
    const regex = /hello (\w+)/;
    const data = "hello world";
    const getMatch = prop(regex);
    const result = getMatch(data);
    expect(result).toBe("hello world");
  });
});