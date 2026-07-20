import Delta from "../../src/Delta";

describe("compose() with empty other delta", () => {
  it("should correctly compose a non-empty delta with an empty delta", () => {
    // When 'other' is empty, otherIter.peek() returns null (firstOther = null)
    // Original code: firstOther != null && ... => false, skip the optimization block safely
    // Mutated code: firstOther != null || ... => null != null || ... => false || (typeof null.retain === 'number' && ...)
    // But due to short-circuit: false || (typeof firstOther.retain ...) would access firstOther.retain when firstOther is null
    // Actually with || and operator precedence: (firstOther != null) || (typeof firstOther.retain === 'number' && firstOther.attributes == null)
    // Since firstOther is null: false || (typeof null.retain === 'number' && ...) => TypeError!
    const a = new Delta().insert("Hello");
    const b = new Delta();
    // Original: composing with empty delta returns same content
    const result = a.compose(b);
    expect(result).toEqual(new Delta().insert("Hello"));
  });
});