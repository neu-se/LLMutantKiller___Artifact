import Delta from '../../../../../../../../../../../subject_repositories/delta/src/Delta';

describe('Delta', () => {
  it('should correctly compose deltas', () => {
    const delta1 = new Delta();
    delta1.retain(5);

    const delta2 = new Delta();
    delta2.retain(5);

    const composedDelta = delta1.compose(delta2);
    expect(composedDelta.ops).toEqual([{ retain: 10 }]);
  });
});