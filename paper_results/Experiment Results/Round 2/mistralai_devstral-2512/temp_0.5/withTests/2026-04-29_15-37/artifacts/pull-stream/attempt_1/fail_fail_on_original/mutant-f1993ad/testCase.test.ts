import { prop } from "../../../../../../../../../../../subject_repositories/pull-stream/util/prop.js";

describe("prop function with object key", () => {
  it("should return a function that extracts values using a regex key", () => {
    const regex = /test/;
    const extractor = prop(regex);
    expect(typeof extractor).toBe("function");

    const testString = "this is a test string";
    const result = extractor(testString);
    expect(result).toBe("test");
  });
});