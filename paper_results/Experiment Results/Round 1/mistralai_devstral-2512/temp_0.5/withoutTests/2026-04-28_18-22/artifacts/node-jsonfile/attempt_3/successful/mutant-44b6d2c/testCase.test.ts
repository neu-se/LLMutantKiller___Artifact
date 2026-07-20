import { stripBom } from "../../../../../../../../../../../subject_repositories/node-jsonfile/utils.js";

describe("stripBom", () => {
  it("should not remove BOM when it appears in the middle of the string", () => {
    const input = "te\uFEFFst";
    const expected = "te\uFEFFst";
    const result = stripBom(input);
    expect(result).toBe(expected);
  });
});