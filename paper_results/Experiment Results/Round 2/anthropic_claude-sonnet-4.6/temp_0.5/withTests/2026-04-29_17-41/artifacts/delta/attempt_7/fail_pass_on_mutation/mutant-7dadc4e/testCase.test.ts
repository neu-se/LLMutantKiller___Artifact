import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe('transform()', () => {
  it('transform two deltas with retain operations produces correct output', () => {
    // Test the retain+retain path where both ops have numeric retains
    // otherData is a number: typeof number === 'object' is false
    // Both original and mutated: transformedData = length
    // This tests the correct behavior of the non-mutated path
    const a = new Delta().retain(2, { bold: true });
    const b = new Delta().retain(2, { italic: true });

    // With priority=true: a wins on conflict, so italic stays only where bold doesn't conflict
    const result = a.transform(b, true);
    // AttributeMap.transform({bold:true}, {italic:true}, true) = {italic:true} (no conflict)
    // transformedData = length = 2
    expect(result).toEqual(new Delta().retain(2, { italic: true }));
  });
});