import { stripBom } from "../../../../../../../../../../../subject_repositories/node-jsonfile/utils.js";

describe("stripBom", () => {
  it("should only remove BOM at the start of content", () => {
    const contentWithBomAtStart = "\uFEFF{\"name\":\"test\"}";
    const contentWithBomInMiddle = "{\"name\":\"\uFEFFtest\"}";
    const contentWithBomAtEnd = "{\"name\":\"test\"}\uFEFF";

    // Original should remove BOM only at start
    expect(stripBom(contentWithBomAtStart)).toBe("{\"name\":\"test\"}");
    // Mutated would incorrectly remove BOM anywhere in string
    expect(stripBom(contentWithBomInMiddle)).toBe("{\"name\":\"\uFEFFtest\"}");
    expect(stripBom(contentWithBomAtEnd)).toBe("{\"name\":\"test\"}\uFEFF");
  });
});