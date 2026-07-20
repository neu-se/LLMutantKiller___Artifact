import { prop } from "../../../../../../../../../../../subject_repositories/pull-stream/util/prop.js";

describe('prop function with regex key', () => {
  it('should return a function that extracts regex match when key is a regex', () => {
    const regex = /hello (\w+)/;
    const extractor = prop(regex);
    const data = "hello world";
    const result = extractor(data);
    expect(result).toBe("hello world");
  });
});