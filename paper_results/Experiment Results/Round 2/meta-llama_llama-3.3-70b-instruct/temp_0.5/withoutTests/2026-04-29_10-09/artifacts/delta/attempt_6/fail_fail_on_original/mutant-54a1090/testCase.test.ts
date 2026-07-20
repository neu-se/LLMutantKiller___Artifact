import Delta from '../../../../../../../../../../../subject_repositories/delta/src/Delta';

describe('Delta', () => {
  it('should compose correctly when thisIter.peekType() is "insert" and thisIter.peekLength() is less than or equal to firstLeft', () => {
    const delta1 = new Delta([{ insert: 'a' }, { insert: 'b' }, { delete: 1 }]);
    const delta2 = new Delta([{ retain: 2 }, { insert: 'c' }]);
    const composedDelta = delta1.compose(delta2);
    expect(composedDelta.ops).toEqual([{ insert: 'ac' }, { delete: 1 }]);
  });
});