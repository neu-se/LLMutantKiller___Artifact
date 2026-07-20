import { prop } from "../../../../../../../../../../../subject_repositories/pull-stream/util/prop.js";

describe('prop function with regex key', () => {
  it('should return a function that extracts match when key is a regex', () => {
    const regex = /hello (\w+)/;
    const getMatch = prop(regex);
    const testString = "hello world";
    const result = getMatch(testString);
    expect(result).toBe("hello world");
  });
});