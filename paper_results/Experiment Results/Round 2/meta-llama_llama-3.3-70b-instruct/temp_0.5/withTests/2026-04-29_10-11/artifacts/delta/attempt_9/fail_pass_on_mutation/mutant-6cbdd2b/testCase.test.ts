import Delta from '../../../../../../../../../../../subject_repositories/delta/src/Delta';

describe('Delta', () => {
  it('should compose correctly when firstOther.retain is a number', () => {
    const a = new Delta().insert('A');
    const b = new Delta().retain(1);
    const expected = new Delta().insert('A');
    expect(a.compose(b)).toEqual(expected);
    const c = new Delta().insert('A');
    const d = new Delta().retain(1, { bold: true });
    const expected2 = new Delta().insert('A', { bold: true });
    expect(c.compose(d)).toEqual(expected2);
  });
});