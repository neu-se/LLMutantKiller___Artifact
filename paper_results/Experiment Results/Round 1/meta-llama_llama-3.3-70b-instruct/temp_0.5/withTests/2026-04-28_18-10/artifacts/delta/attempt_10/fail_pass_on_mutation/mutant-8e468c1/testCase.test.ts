import Delta from '../../../../../../../../../../../subject_repositories/delta/src/Delta';

describe('Delta', () => {
  it('compose with thisIter.peekType() === "insert"', () => {
    const a = new Delta().insert('A');
    const b = new Delta().retain(1);
    const expected = new Delta().insert('A');
    expect(a.compose(b).ops).toEqual([{ insert: 'A' }]);
    const c = new Delta().insert('X');
    const d = new Delta().retain(1);
    expect(c.compose(d).ops).not.toEqual([{ insert: 'X', retain: 1 }]);
  });
});