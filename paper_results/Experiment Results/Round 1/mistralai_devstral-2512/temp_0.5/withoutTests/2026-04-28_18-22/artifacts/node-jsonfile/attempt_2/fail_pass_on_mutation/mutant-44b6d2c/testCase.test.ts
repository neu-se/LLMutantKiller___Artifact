import { stripBom } from "../../../../../../../../../../../subject_repositories/node-jsonfile/utils.js";

describe("stripBom", () => {
  it("should only remove BOM from the start of the string", () => {
    const input = "\uFEFFtest";
    const expected = "test";
    const result = stripBom(input);
    expect(result).toBe(expected);
  });
});