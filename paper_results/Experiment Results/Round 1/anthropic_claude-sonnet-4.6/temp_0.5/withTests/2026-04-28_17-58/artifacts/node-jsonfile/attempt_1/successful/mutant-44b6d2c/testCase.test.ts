import { stripBom } from "../../../../../../../../../../../subject_repositories/node-jsonfile/utils.js";

describe("stripBom", () => {
  it("should only remove BOM character at the start of the string, not in the middle", () => {
    // A string with BOM in the middle (not at the start)
    const contentWithBomInMiddle = "hello\uFEFFworld";
    const result = stripBom(contentWithBomInMiddle);
    // Original: /^\uFEFF/ only removes BOM at start, so middle BOM should remain
    // Mutant: /\uFEFF/ removes ALL BOM characters, so middle BOM would be removed
    expect(result).toBe("hello\uFEFFworld");
  });
});