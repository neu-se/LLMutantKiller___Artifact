import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe("Delta.compose", () => {
  it("should not throw and preserve inserts when composing with an empty delta", () => {
    // When other is empty, otherIter.peek() returns undefined (firstOther = undefined)
    // Original code: firstOther != null is false -> safely skips the optimization block
    // Mutated code: firstOther == null is true (undefined == null) -> enters block
    //   and accesses firstOther.retain -> TypeError: Cannot read property 'retain' of undefined
    const delta = new Delta().insert("Hello");
    const emptyDelta = new Delta();

    // Original: safely returns delta with the insert preserved
    // Mutated: throws TypeError when accessing firstOther.retain
    const result = delta.compose(emptyDelta);
    expect(result.ops).toEqual([{ insert: "Hello" }]);
  });
});