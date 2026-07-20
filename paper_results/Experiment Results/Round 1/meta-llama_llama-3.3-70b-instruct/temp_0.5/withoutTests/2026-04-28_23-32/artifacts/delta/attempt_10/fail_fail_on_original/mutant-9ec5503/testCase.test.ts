import Delta from '../../../../../../../../../../../subject_repositories/delta/src/Delta';

describe('Delta', () => {
  it('should correctly compose deltas when the first operation of the other delta is a retain with a value of 3', () => {
    const delta1 = new Delta([{ retain: 5 }]);
    const delta2 = new Delta([{ retain: 3 }, { insert: 'Hello' }]);
    const composedDelta = delta1.compose(delta2);
    expect(composedDelta.ops).toEqual([{ retain: 2 }, { retain: 3 }, { insert: 'Hello' }]);
  });
});