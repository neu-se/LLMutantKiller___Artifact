import { stripBom } from "../../../../../../../../../../../subject_repositories/node-jsonfile/utils.js";

describe("stripBom", () => {
  it("should not modify non-Buffer input when mutation tries to force Buffer conversion", () => {
    const testString = "hello world";
    const result = stripBom(testString);
    expect(result).toBe(testString);
    expect(typeof result).toBe("string");
  });
});