import Delta from "../../../../../../../../../../../../../subject_repositories/delta/src/Delta.ts";

describe('transform() numeric retain mutation detection', () => {
  it('transforms two numeric retains producing correct result not inflated by raw otherData', () => {
    // a retains 3, b retains 5
    // First iteration: length = min(3,5) = 3, otherData = 5
    // Original: typeof 5 === 'object' is false => transformedData = length = 3
    // Mutated:  true && 5 !== null => transformedData = otherData = 5
    // Second iteration: length = 2, otherData = 2 => transformedData = 2 (same both)
    // Original result: retain(3) + retain(2) = retain(5)
    // Mutated result:  retain(5) + retain(2) = retain(7)
    const a = new Delta().retain(3);
    const b = new Delta().retain(5);
    const result = a.transform(b, false);
    const expected = new Delta().retain(5);
    expect(result).toEqual(expected);
  });
});