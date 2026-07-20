import { stripBom } from "../../../../../../../../../../../subject_repositories/node-jsonfile/utils.js";

describe("stripBom", () => {
  it("should only remove BOM character at the beginning of the string, not in the middle", () => {
    // A string with BOM in the middle (not at start) should not be modified
    const contentWithBomInMiddle = "hello\uFEFFworld";
    const result = stripBom(contentWithBomInMiddle);
    // Original code uses /^\uFEFF/ which only matches at start, so middle BOM stays
    // Mutated code uses /\uFEFF/ which matches anywhere, so middle BOM would be removed
    expect(result).toBe("hello\uFEFFworld");
  });
});