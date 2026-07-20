import Delta from '../../../../../../../../../../../subject_repositories/delta/src/Delta';

describe('Delta', () => {
  it('compose with retain and insert when firstOther.retain is a number and thisIter.peekType is insert', () => {
    const a = new Delta().insert('A');
    const b = new Delta().retain(1).insert('B');
    const expected = new Delta().insert('AB');
    expect(a.compose(b)).toEqual(expected);
    const c = new Delta().insert('X');
    const d = new Delta().retain(1).insert('B');
    expect(c.compose(d)).toEqual(new Delta().insert('XB'));
  });
});