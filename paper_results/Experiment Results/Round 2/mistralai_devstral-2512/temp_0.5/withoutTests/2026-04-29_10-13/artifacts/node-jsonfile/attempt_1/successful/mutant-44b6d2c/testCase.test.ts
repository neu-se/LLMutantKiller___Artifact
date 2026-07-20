import { stripBom } from "../../../../../../../../../../../subject_repositories/node-jsonfile/utils.js";

describe("stripBom", () => {
  it("should only remove BOM at the start of the content", () => {
    const contentWithBomAtStart = "\uFEFF{\"key\":\"value\"}";
    const contentWithBomInMiddle = "{\"key\":\"\uFEFFvalue\"}";
    const contentWithBomAtEnd = "{\"key\":\"value\"}\uFEFF";

    // Test content with BOM at the start (should be removed)
    const result1 = stripBom(contentWithBomAtStart);
    expect(result1).toBe("{\"key\":\"value\"}");

    // Test content with BOM in the middle (should not be removed)
    const result2 = stripBom(contentWithBomInMiddle);
    expect(result2).toBe("{\"key\":\"\uFEFFvalue\"}");

    // Test content with BOM at the end (should not be removed)
    const result3 = stripBom(contentWithBomAtEnd);
    expect(result3).toBe("{\"key\":\"value\"}\uFEFF");
  });
});