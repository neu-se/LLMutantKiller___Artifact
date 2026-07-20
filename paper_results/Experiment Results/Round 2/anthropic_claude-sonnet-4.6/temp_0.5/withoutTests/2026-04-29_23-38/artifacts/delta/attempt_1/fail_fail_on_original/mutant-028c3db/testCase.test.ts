import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta.ts";

describe("Delta.compose", () => {
  it("should correctly compose two deltas where the first op of other is a retain without attributes", () => {
    // Create a base delta with an insert
    const base = new Delta().insert("Hello World");
    
    // Create another delta that retains some characters and then inserts
    const other = new Delta().retain(5).insert("!");
    
    // In the original code, firstOther != null check ensures we enter the optimization
    // when firstOther is a retain without attributes.
    // In the mutated code, firstOther == null check would never enter the optimization
    // when firstOther is a valid retain op (since it's not null).
    const result = base.compose(other);
    
    // The result should be: "Hello!" followed by " World"
    // The optimization in compose() moves insert ops before the retain
    // Expected: insert "Hello" (from optimization), insert "!", retain " World" -> "Hello! World"
    expect(result.ops).toEqual([
      { insert: "Hello!" },
      { insert: " World" },
    ]);
  });
});