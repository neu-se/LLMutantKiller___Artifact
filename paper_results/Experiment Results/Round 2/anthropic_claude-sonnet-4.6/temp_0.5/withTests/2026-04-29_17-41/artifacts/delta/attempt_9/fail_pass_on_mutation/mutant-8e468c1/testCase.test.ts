import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe('compose() mutation detection', () => {
  it('correctly handles retain in this when other starts with plain retain', () => {
    // 'a' starts with a retain with attributes, length fits within b's leading retain
    // 'b' starts with a plain retain (no attributes) of same length
    // Original: retain goes through main loop, attributes are preserved
    // Mutated: retain is fast-pathed (copied as-is to ops), otherIter advances,
    //          so the retain's attributes survive but positioning may differ
    const a = new Delta().retain(2, { bold: true }).insert('X');
    const b = new Delta().retain(2).insert('Y');
    // compose: retain(2, bold) + retain(2, no attrs) = retain(2, bold), then insert Y before X
    const expected = new Delta().retain(2, { bold: true }).insert('Y').insert('X');
    expect(a.compose(b)).toEqual(expected);
  });
});