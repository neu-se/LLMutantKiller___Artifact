import Delta from '../../../../../../../../../../../subject_repositories/delta/src/Delta';

describe('Delta', () => {
  it('compose with multiple inserts and firstOther.retain is a number and thisIter.peekType is insert', () => {
    const a = new Delta().insert('A').insert('B');
    const b = new Delta().retain(1).insert('C');
    const expected = new Delta().insert('AC').insert('B');
    expect(a.compose(b)).toEqual(expected);
    const c = new Delta().insert('X').insert('Y');
    const d = new Delta().retain(1).insert('Z');
    expect(c.compose(d)).toEqual(new Delta().insert('XZ').insert('Y'));
  });
});