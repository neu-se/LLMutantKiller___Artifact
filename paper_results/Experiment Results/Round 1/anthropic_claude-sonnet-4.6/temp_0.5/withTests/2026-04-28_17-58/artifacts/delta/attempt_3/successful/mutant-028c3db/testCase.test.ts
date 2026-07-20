import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe("compose()", () => {
  it("composes with an empty other delta without throwing", () => {
    // When other is empty, firstOther is undefined (otherIter.peek() returns {retain: Infinity}).
    // Original: firstOther != null is true (since {retain: Infinity} is not null),
    // but typeof firstOther.retain === 'number' && firstOther.attributes == null is true,
    // so the optimization runs safely.
    // With mutation: firstOther == null is false for the peeked op, so block is skipped.
    // Actually when other has no ops, peek returns {retain: Infinity}.
    // Let's compose a document delta with an empty other.
    const a = new Delta().insert("Hello");
    const b = new Delta();
    const expected = new Delta().insert("Hello");
    expect(a.compose(b)).toEqual(expected);
  });
});