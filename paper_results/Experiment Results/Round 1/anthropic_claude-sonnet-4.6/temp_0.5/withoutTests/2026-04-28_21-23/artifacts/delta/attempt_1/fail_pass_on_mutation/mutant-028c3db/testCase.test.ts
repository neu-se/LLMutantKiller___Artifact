import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta.ts";

describe("Delta.compose", () => {
  it("should correctly compose two deltas where the first op of other is a retain without attributes", () => {
    // Create a delta with an insert
    const delta1 = new Delta().insert("Hello");
    // Create a delta that retains the inserted content
    const delta2 = new Delta().retain(5);

    // When composed, the result should preserve the insert from delta1
    // In the original code: firstOther != null checks that firstOther exists before accessing .retain
    // In the mutated code: firstOther == null would only enter the optimization block when firstOther is null,
    // which would cause a crash or incorrect behavior
    const result = delta1.compose(delta2);

    // The composed result should still have the insert
    expect(result.ops).toEqual([{ insert: "Hello" }]);
  });
});