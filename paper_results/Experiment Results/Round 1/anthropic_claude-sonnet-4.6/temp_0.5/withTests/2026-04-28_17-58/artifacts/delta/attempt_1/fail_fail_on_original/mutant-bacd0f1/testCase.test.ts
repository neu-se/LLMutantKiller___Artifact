import Delta from "../src/Delta";

describe('transform()', () => {
  it('retain with different lengths should use min length not otherData', () => {
    // thisOp retains 1, otherOp retains 3
    // length = min(1, 3) = 1
    // original: transformedData = (typeof 3 === 'object' && 3 !== null) ? 3 : 1 = 1
    // mutated:  transformedData = (typeof 3 === 'object' || 3 !== null) ? 3 : 1 = 3
    const a = new Delta().retain(1, { bold: true });
    const b = new Delta().retain(3, { italic: true });
    const result = a.transform(b, true);
    // With original: retain(1, {italic: true}) then retain(2, {italic: true})
    // With mutated: retain(3, {italic: true}) — wrong, merges what should be split
    const expected = new Delta().retain(1, { italic: true }).retain(2, { italic: true });
    expect(result).toEqual(expected);
  });
});