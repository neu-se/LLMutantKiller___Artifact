import Delta from '../../../../../../../../../../../subject_repositories/delta/src/Delta';

describe('Delta', () => {
  it('compose with firstOther.retain and firstOther.attributes == null', () => {
    const a = new Delta().insert('A');
    const b = new Delta().retain(1);
    const c = new Delta().insert('X');
    const expected = new Delta().insert('AX');
    expect(a.compose(b).compose(c)).toEqual(expected);
  });
});