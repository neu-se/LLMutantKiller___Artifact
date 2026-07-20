import { stripBom } from "../../../../../../../../../../../subject_repositories/node-jsonfile/utils.js";

describe("stripBom", () => {
  it("should handle non-Buffer input correctly", () => {
    const input = "test string";
    const result = stripBom(input);
    expect(result).toBe(input);
  });
});