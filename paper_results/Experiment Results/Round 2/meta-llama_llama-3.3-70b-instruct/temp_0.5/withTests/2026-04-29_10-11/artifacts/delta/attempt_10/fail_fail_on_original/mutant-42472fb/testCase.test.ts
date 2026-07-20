import Delta from '../../../../../../../../../../../subject_repositories/delta/src/Delta';

describe('Delta', () => {
  it('compose with insert before retain when firstOther.retain is a number', () => {
    const a = new Delta().insert('A');
    const b = new Delta().retain(1).insert('B');
    const c = new Delta().insert('X');
    const expected = new Delta().insert('AXB');
    expect(a.compose(c.compose(b))).toEqual(expected);
  });
});