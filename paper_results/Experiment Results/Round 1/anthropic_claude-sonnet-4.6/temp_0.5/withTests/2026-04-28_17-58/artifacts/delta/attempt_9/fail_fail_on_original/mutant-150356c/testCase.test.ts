import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta.ts";

describe('compose()', () => {
  it('retain start optimization only copies insert ops not attributed retains', () => {
    const a = new Delta().insert('AB').retain(1, { bold: true });
    const b = new Delta().retain(4).insert('X');
    const expected = new Delta().insert('AB').insert('X').retain(1, { bold: true });
    expect(a.compose(b)).toEqual(expected);
  });
});