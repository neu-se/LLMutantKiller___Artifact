import Delta from "../../../../../../../../../../../../src/Delta";

describe("compose() with empty other delta", () => {
  it("should correctly compose a non-empty delta with an empty delta without throwing", () => {
    // When 'other' is empty, otherIter.peek() returns null (firstOther = null)
    // Original: firstOther != null && ... => false (short-circuits safely)
    // Mutated: firstOther != null || typeof firstOther.retain === 'number' && ...
    //   => null != null || typeof null.retain === 'number' && ...
    //   => false || TypeError (accessing .retain on null)
    const a = new Delta().insert("Hello");
    const b = new Delta();
    const result = a.compose(b);
    expect(result).toEqual(new Delta().insert("Hello"));
  });
});