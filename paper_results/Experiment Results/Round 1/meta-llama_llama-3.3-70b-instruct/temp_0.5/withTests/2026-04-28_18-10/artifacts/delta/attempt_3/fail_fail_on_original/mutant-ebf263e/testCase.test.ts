import Delta from '../../../../../../../../../../../subject_repositories/delta/src/Delta';

describe('Delta', () => {
  it('compose with firstOther.retain and firstOther.attributes == null', () => {
    const a = new Delta().insert('A', { bold: true });
    const b = new Delta().retain(1);
    const c = new Delta().insert('B');
    const expected = new Delta().insert('A', { bold: true }).insert('B');
    expect(a.compose(b).compose(c)).toEqual(expected);
  });
});