import Delta from '../../../../../../../../../../../subject_repositories/delta/src/Delta';

describe('Delta', () => {
  it('compose with null check', () => {
    const a = new Delta().insert('A');
    const b = new Delta().retain(1);
    const expected = new Delta().insert('A', { bold: true });
    const bMutated = new Delta().retain(1, { bold: true });
    expect(a.compose(bMutated)).toEqual(expected);
  });
});