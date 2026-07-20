import { stripBom } from "../../../../../../../../../../../subject_repositories/node-jsonfile/utils.js";

describe("stripBom", () => {
  it("should handle empty string input correctly", () => {
    const result = stripBom("");
    expect(result).toBe("");
  });
});