import { stripBom } from "../../../../../../../../../../../subject_repositories/node-jsonfile/utils.js";

describe("stripBom", () => {
  it("should only remove BOM character at the beginning of the string, not in the middle", () => {
    // A string with BOM in the middle (not at the start)
    const contentWithBomInMiddle = "hello\uFEFFworld";
    const result = stripBom(contentWithBomInMiddle);
    // Original uses /^\uFEFF/ which only matches BOM at start, so middle BOM is preserved
    // Mutated uses /\uFEFF/ which removes BOM anywhere (but only first occurrence without 'g' flag)
    // Both would leave "hello\uFEFFworld" unchanged since BOM is not at start
    // Let's use a string that starts with BOM followed by another BOM
    const contentWithTwoBoms = "\uFEFF\uFEFFhello";
    const resultTwo = stripBom(contentWithTwoBoms);
    // Original: /^\uFEFF/ removes only the first BOM at start -> "\uFEFFhello"
    // Mutated: /\uFEFF/ removes first occurrence anywhere -> "\uFEFFhello" (same result here)
    // Need a different approach: BOM not at start
    const contentWithBomNotAtStart = "hello\uFEFFworld";
    const resultNotAtStart = stripBom(contentWithBomNotAtStart);
    // Original: no BOM at start, so nothing removed -> "hello\uFEFFworld"
    // Mutated: removes first \uFEFF anywhere -> "helloworld"
    expect(resultNotAtStart).toBe("hello\uFEFFworld");
  });
});