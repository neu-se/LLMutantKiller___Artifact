import Delta from '../../../../../../../../../../../subject_repositories/delta/src/Delta';

describe('Delta', () => {
  it('should compose deltas correctly when the first delta has an insert operation', () => {
    const delta1 = new Delta([{ insert: 'Hello' }]);
    const delta2 = new Delta([{ retain: 5 }]);
    const composedDelta = delta1.compose(delta2);
    expect(composedDelta.ops).toEqual([{ insert: 'Hello' }, { retain: 5 }]);
  });
});