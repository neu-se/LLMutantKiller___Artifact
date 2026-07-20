import { stripBom } from "../../../../../../../../../../../subject_repositories/node-jsonfile/utils.js"

describe("stripBom", () => {
  it("should only remove BOM character at the start of the string, not in the middle", () => {
    // A string with BOM in the middle (not at the start)
    const contentWithBomInMiddle = "hello\uFEFFworld"
    const result = stripBom(contentWithBomInMiddle)
    
    // Original code uses /^\uFEFF/ which only matches BOM at the start
    // Mutated code uses /\uFEFF/ which matches BOM anywhere (but only first occurrence due to no 'g' flag)
    // For a string with BOM NOT at the start, original returns it unchanged,
    // but mutated code removes the BOM from the middle
    expect(result).toBe("hello\uFEFFworld")
  })
})