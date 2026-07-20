import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta.ts";

describe("Delta.diff", () => {
  it("correctly diffs when other delta has multiple insert ops that span a single diff INSERT component", () => {
    // Create a base delta (empty document)
    const base = new Delta().insert("abc");
    
    // Create other delta with multiple ops that together form a longer string
    // The diff INSERT component will span across multiple ops in otherIter
    const other = new Delta().insert("hel").insert("lo").insert("abc");
    
    // diff base against other: "abc" -> "helloabc"
    // diff result: INSERT "hello", EQUAL "abc"
    // When processing INSERT "hello" (length=5), otherIter first peeks "hel" (length=3)
    // Math.min(3, 5) = 3 (correct), Math.max(3, 5) = 5 (wrong)
    const result = base.diff(other);
    
    // Expected: insert "hello", retain 3
    const expected = new Delta().insert("hello");
    
    expect(result).toEqual(expected);
  });
});