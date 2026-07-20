import { stripBom } from "../../../../../../../../../../../subject_repositories/node-jsonfile/utils.js";

describe("stripBom", () => {
  it("should remove BOM only from the beginning of the string", () => {
    const input = "\uFEFFtest\uFEFF";
    const expected = "test\uFEFF";
    const result = stripBom(input);
    expect(result).toBe(expected);
  });
});