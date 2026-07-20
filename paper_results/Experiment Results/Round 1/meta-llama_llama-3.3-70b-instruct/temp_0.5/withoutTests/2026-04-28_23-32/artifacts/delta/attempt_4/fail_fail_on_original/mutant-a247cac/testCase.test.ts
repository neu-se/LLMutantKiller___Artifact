import Delta from '../../../../../../../../../../../subject_repositories/delta/src/Delta';

describe('Delta', () => {
  it('should compose correctly', () => {
    const delta1 = new Delta();
    delta1.retain(1);
    const delta2 = new Delta();
    delta2.retain(2);
    const composed = delta1.compose(delta2);
    const rest = delta1.ops;
    const newOp = { retain: 2 };
    expect(composed.ops.length).toBe(1);
    expect(composed.ops[0].retain).toBe(3);
    expect(composed.ops[composed.ops.length - 1]).toEqual(newOp);
  });
});