import Delta from '../../../../../../../../../../../subject_repositories/delta/src/Delta';

describe('Delta', () => {
  it('should correctly compose deltas', () => {
    const delta1 = new Delta();
    delta1.insert('Hello');

    const delta2 = new Delta();
    delta2.retain(5);
    delta2.insert(' world');

    const composedDelta = delta1.compose(delta2);
    const lastOp = composedDelta.ops[composedDelta.ops.length - 1];
    expect(lastOp).toHaveProperty('retain', 5);
  });
});