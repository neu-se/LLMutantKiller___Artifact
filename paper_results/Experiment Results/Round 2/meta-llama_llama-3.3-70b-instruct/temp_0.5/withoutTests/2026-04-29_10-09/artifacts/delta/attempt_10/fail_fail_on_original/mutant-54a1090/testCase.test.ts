import Delta from '../../../../../../../../../../../subject_repositories/delta/src/Delta';

describe('Delta', () => {
  it('should compose correctly when thisIter.peekType() is "insert" and thisIter.peekLength() is less than or equal to firstLeft', () => {
    const delta1 = new Delta([{ insert: 'a' }, { retain: 1 }, { insert: 'b' }]);
    const delta2 = new Delta([{ retain: 1 }, { insert: 'c' }, { delete: 1 }]);
    const composedDelta = delta1.compose(delta2);
    expect(composedDelta.ops).toEqual([{ insert: 'a' }, { retain: 1 }, { insert: 'bc' }, { delete: 1 }]);
  });
});