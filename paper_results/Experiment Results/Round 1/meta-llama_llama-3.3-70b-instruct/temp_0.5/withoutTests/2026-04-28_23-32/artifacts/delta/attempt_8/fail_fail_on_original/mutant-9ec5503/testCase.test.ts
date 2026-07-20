import Delta from '../../../../../../../../../../../subject_repositories/delta/src/Delta';

describe('Delta', () => {
  it('should correctly compose deltas when the first operation of the other delta is a retain with no attributes', () => {
    const delta1 = new Delta([{ retain: 5 }]);
    const delta2 = new Delta([{ retain: 0 }, { insert: 'Hello' }]);
    const composedDelta = delta1.compose(delta2);
    expect(composedDelta.ops).toEqual([{ retain: 5 }, { insert: 'Hello' }]);
  });
});