import Delta from '../../../../../../../../../../../subject_repositories/delta/src/Delta';

describe('Delta', () => {
  it('compose with firstOther.retain and firstOther.attributes == null', () => {
    const a = new Delta().insert('A');
    const b = new Delta().retain(1);
    const expected = new Delta().insert('A');
    expect(a.compose(b)).toEqual(expected);
    const c = new Delta().insert('Hello');
    const d = new Delta().retain(3).insert('X');
    const expected2 = new Delta().insert('HelXlo');
    expect(c.compose(d)).toEqual(expected2);
  });
});