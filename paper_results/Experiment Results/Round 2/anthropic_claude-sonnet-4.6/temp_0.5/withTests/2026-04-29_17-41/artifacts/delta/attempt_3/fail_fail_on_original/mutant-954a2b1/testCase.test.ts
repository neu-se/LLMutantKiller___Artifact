import Delta from "../../src/Delta";

describe("compose()", () => {
  it("should correctly compose a non-empty delta with an empty delta without throwing", () => {
    // When 'other' is empty, otherIter.peek() returns null (firstOther = null)
    // Original: firstOther != null && typeof firstOther.retain === 'number' && ...
    //   => null != null && ... => false (short-circuits safely, skips block)
    // Mutated: firstOther != null || typeof firstOther.retain === 'number' && ...
    //   => false || (typeof null.retain === 'number' && ...) => TypeError!
    const a = new Delta().insert("Hello");
    const b = new Delta();
    const result = a.compose(b);
    expect(result).toEqual(new Delta().insert("Hello"));
  });
});