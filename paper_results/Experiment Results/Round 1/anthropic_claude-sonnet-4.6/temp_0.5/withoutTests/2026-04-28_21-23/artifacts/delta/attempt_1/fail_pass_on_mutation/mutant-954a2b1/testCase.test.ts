import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe("Delta compose optimization block", () => {
  it("should correctly compose when the first op in other is an insert, not a retain", () => {
    // Create a base delta with some content
    const base = new Delta().insert("hello");
    
    // Create an other delta where the FIRST operation is an insert (not a retain)
    // In the mutated code: firstOther != null is true, so the OR makes the whole condition true
    // regardless of typeof firstOther.retain === 'number' being false
    // This causes the optimization block to run incorrectly when firstOther is an insert
    const other = new Delta().insert("world");
    
    // With the original code: firstOther is {insert: "world"}, 
    //   typeof firstOther.retain === 'number' is false, so the optimization block is skipped
    // With the mutated code: firstOther != null is true, OR short-circuits,
    //   so the block runs and tries to use firstOther.retain (undefined) as a number
    //   firstLeft = undefined, the while loop condition becomes NaN <= undefined which is false
    //   then firstOther.retain - firstLeft = NaN, so otherIter.next(NaN) is called
    //   This causes incorrect behavior
    
    const result = base.compose(other);
    
    // Expected: insert "world" followed by insert "hello"
    // (insert before existing content when composing at position 0)
    expect(result.ops).toEqual([
      { insert: "worldhello" }
    ]);
  });
});