import Delta from '../../../../../../../../../../../subject_repositories/delta/src/Delta';

describe('Delta', () => {
  it('should correctly compose deltas when the first operation is a retain', () => {
    const delta1 = new Delta();
    delta1.retain(5);
    const delta2 = new Delta();
    delta2.retain(3);
    const composedDelta = delta1.compose(delta2);
    expect(composedDelta.ops.length).toBeGreaterThan(0);
    expect(composedDelta.ops[0].retain).toBeGreaterThan(0);
  });
});