import Delta from "../../src/Delta";

describe('transform() numeric retain mutation detection', () => {
  it('transforms two numeric retains using the correct length, not the raw otherData value', () => {
    // this has retain(3), other has retain(5)
    // length = min(3, 5) = 3
    // Original: typeof 5 === 'object' is false => transformedData = length = 3
    // Mutated:  true && 5 !== null is true => transformedData = otherData = 5
    const a = new Delta().retain(3);
    const b = new Delta().retain(5);
    const result = a.transform(b, false);
    // The transformed delta should retain 5 total, but 'a' only covers 3 positions
    // After transforming b by a: the first 3 positions of b's retain(5) become retain(3),
    // and the remaining 2 become retain(2), merged into retain(5) — but with the mutation,
    // the first chunk would be retain(5) instead of retain(3), giving wrong result.
    // Expected: retain(5) (since no inserts, just retains, they merge back to 5)
    // But with mutation, first chunk is retain(5), second chunk is retain(2) => retain(7)
    const expected = new Delta().retain(5);
    expect(result).toEqual(expected);
  });
});