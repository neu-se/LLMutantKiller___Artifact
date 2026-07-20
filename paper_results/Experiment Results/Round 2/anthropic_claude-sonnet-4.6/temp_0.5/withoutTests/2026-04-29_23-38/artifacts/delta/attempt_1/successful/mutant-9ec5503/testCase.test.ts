import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta.ts";

describe("Delta.compose", () => {
  it("should correctly compose a delta with an empty delta without throwing", () => {
    const delta = new Delta().insert("hello");
    const empty = new Delta();
    
    // When composing with an empty delta, firstOther will be null
    // Original code: firstOther != null && ... (skips the block safely)
    // Mutated code: true && firstOther.attributes (throws TypeError: Cannot read properties of null)
    const result = delta.compose(empty);
    
    expect(result.ops).toEqual([{ insert: "hello" }]);
  });
});