import { stripBom } from "../../../../../../../../../../../subject_repositories/node-jsonfile/utils.js";

describe("stripBom", () => {
  it("should handle regular strings without Buffer conversion", () => {
    const input = "test string";
    const result = stripBom(input);
    expect(result).toBe(input);
  });
});