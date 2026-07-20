import { prop } from "../../../../../../../../../../../subject_repositories/pull-stream/util/prop.js";

describe('prop function with regex key', () => {
  it('should return a function that extracts matches using regex exec', () => {
    const regex = /hello (\w+)/;
    const propFn = prop(regex);
    const testData = "hello world";

    const result = propFn(testData);

    expect(result).toBe("hello world");
  });
});