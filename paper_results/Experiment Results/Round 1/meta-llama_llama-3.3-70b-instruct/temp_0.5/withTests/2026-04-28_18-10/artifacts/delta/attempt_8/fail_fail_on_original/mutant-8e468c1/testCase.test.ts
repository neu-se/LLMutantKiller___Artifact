import Delta from '../../../../../../../../../../../subject_repositories/delta/src/Delta';

describe('Delta', () => {
  it('compose with firstOther.retain and thisIter.peekType() check', () => {
    const a = new Delta().insert('A');
    const b = new Delta().retain(1).insert('B');
    expect(a.compose(b).ops).toEqual([{ insert: 'BA' }]);
  });
});