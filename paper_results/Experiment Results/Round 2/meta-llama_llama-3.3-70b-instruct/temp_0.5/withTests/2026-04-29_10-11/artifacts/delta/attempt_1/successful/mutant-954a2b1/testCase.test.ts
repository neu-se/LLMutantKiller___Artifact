import Delta from '../../../../../../../../../../../subject_repositories/delta/src/Delta';

describe('Delta', () => {
  it('compose with firstOther != null and firstOther.retain is a number', () => {
    const a = new Delta().insert('A');
    const b = new Delta().retain(1, { bold: true });
    const expected = new Delta().insert('A', { bold: true });
    expect(a.compose(b)).toEqual(expected);
  });

  it.skip('compose with firstOther == null or firstOther.retain is not a number', () => {
    const a = new Delta().insert('A');
    const b = new Delta().retain({ embed: 1 });
    const expected = new Delta().insert('A').retain({ embed: 1 });
    expect(a.compose(b)).toEqual(expected);
  });
});