import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe('compose()', () => {
  it('insert + retain produces correct composed result', () => {
    const a = new Delta().insert('A');
    const b = new Delta().retain(1, { bold: true, color: 'red', font: null });
    const expected = new Delta().insert('A', { bold: true, color: 'red' });
    expect(a.compose(b)).toEqual(expected);
  });
});