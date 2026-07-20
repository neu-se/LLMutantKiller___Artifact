import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta.ts";

describe('compose()', () => {
  it('retain start optimization should not copy non-insert ops causing incorrect otherIter advancement', () => {
    const a = new Delta().retain(2, { bold: true }).delete(1);
    const b = new Delta().retain(4);
    // Original: retain(2,{bold:true}), delete(1) - the trailing retain(4) in b is chopped
    const expected = new Delta().retain(2, { bold: true }).delete(1);
    expect(a.compose(b)).toEqual(expected);
  });
});