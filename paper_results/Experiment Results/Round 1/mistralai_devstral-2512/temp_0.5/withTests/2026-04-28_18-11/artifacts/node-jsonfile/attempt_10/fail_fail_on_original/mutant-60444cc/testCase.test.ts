import { stripBom } from "../../../../../../../../../../../subject_repositories/node-jsonfile/utils.js";

describe("stripBom", () => {
  it("should handle object input without forcing Buffer conversion", () => {
    const testObject = { test: "value" };
    const result = stripBom(testObject);
    expect(result).toBe("[object Object]");
  });
});