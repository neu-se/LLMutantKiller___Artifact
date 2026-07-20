import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe('compose()', () => {
  it('retain start optimization with attributed retain after initial plain retain', () => {
    const a = new Delta().insert('A').insert('B').retain(2);
    const b = new Delta().retain(2).retain(2, { bold: true });
    const expected = new Delta().insert('A').insert('B').retain(2, { bold: true });
    expect(a.compose(b)).toEqual(expected);
  });
});