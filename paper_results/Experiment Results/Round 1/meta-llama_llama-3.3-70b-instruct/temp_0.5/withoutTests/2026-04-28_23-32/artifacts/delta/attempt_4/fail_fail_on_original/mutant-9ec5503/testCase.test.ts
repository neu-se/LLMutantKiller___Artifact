import Delta from '../../../../../../../../../../../subject_repositories/delta/src/Delta';

describe('Delta', () => {
  it('should correctly compose deltas when the first operation of the other delta is a retain with no attributes and null check', () => {
    const delta1 = new Delta([{ retain: 5 }]);
    const delta2 = new Delta([{ retain: 3 }, { insert: 'Hello' }]);
    const composedDeltaOriginal = delta1.compose(delta2);
    expect(composedDeltaOriginal.ops).toEqual([{ retain: 2 }, { retain: 3 }, { insert: 'Hello' }]);
    const delta3 = new Delta([{ retain: null }, { insert: 'Hello' }]);
    const composedDeltaMutated = delta1.compose(delta3);
    expect(composedDeltaMutated.ops).toEqual([{ retain: 5 }, { insert: 'Hello' }]);
  });
});