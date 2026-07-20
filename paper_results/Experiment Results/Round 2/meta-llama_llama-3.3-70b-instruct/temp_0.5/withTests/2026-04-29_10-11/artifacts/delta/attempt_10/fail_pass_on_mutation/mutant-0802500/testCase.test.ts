import Delta from '../../../../../../../../../../../subject_repositories/delta/src/Delta';

describe('Delta', () => {
  it('compose with firstOther.retain and thisIter.peekType() === "insert"', () => {
    const a = new Delta().insert('Hello');
    const b = new Delta().retain(0);
    const expected = new Delta().insert('Hello');
    expect(a.compose(b)).toEqual(expected);
    const c = new Delta().insert('Hello');
    const d = new Delta().retain(5);
    expect(c.compose(d)).toEqual(new Delta().insert('Hello'));
  });
});