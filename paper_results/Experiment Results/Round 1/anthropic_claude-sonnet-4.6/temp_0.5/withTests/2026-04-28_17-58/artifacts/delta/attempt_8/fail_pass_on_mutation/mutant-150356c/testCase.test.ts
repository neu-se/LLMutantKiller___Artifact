import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta.ts";

describe('compose()', () => {
  it('retain start optimization stops at non-insert ops preserving correct composition', () => {
    const a = new Delta().insert('AB').retain(2, { bold: true });
    const b = new Delta().retain(5).insert('X');
    const expected = new Delta().insert('AB').retain(2, { bold: true }).retain(1).insert('X');
    expect(a.compose(b)).toEqual(expected);
  });
});