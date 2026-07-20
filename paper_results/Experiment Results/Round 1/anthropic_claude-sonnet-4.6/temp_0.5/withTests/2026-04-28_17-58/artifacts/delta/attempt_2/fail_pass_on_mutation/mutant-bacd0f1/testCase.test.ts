import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe('transform()', () => {
  it('retain + retain where this retain is shorter should produce correct split result', () => {
    // a retains 1 position, b retains 3 positions
    // length = min(1, 3) = 1
    // original: transformedData = (typeof 3 === 'object' && 3 !== null) ? 3 : 1 = 1
    // mutated:  transformedData = (typeof 3 === 'object' || 3 !== null) ? 3 : 1 = 3
    // So original produces retain(1) + retain(2), mutated produces retain(3)
    const a = new Delta().retain(1);
    const b = new Delta().retain(3);
    const result = a.transform(b, false);
    // Expected: retain(3) since no attributes to transform, but the retain length matters
    // Actually with no attributes, both should just pass through
    // Let's use attributes to make the difference visible
    const a2 = new Delta().retain(1, { bold: true });
    const b2 = new Delta().retain(3, { italic: true });
    const result2 = a2.transform(b2, true);
    // original: retain(1, {italic:true}).retain(2, {italic:true})
    // mutated: retain(3, {italic:true}) — because transformedData=3 merges the two ops
    const expected = new Delta().retain(1, { italic: true }).retain(2, { italic: true });
    expect(result2).toEqual(expected);
  });
});