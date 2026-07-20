import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe('compose() with empty other delta', () => {
  it('should optimize retain when other delta is empty', () => {
    const a = new Delta().insert('A').insert('B', { bold: true });
    const b = new Delta();
    const expected = new Delta().insert('A').insert('B', { bold: true });
    expect(a.compose(b)).toEqual(expected);
  });
});