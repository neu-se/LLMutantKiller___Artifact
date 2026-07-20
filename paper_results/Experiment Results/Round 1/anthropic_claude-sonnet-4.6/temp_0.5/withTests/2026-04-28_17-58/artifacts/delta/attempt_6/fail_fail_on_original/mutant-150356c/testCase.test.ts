import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta.ts";

describe('compose()', () => {
  it('retain start optimization only copies insert ops preserving correct op ordering', () => {
    const a = new Delta().retain(2, { bold: true });
    const b = new Delta().retain(2).insert('X');
    const expected = new Delta().insert('X').retain(2, { bold: true });
    expect(a.compose(b)).toEqual(expected);
  });
});