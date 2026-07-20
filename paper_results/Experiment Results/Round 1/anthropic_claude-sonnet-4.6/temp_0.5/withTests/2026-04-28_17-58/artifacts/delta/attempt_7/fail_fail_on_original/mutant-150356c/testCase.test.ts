import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta.ts";

describe('compose()', () => {
  it('retain start optimization stops at non-insert ops from this', () => {
    const a = new Delta().insert('AB').retain(2, { bold: true });
    const b = new Delta().retain(5).insert('X');
    const expected = new Delta().insert('AB').insert('X').retain(2, { bold: true });
    expect(a.compose(b)).toEqual(expected);
  });
});