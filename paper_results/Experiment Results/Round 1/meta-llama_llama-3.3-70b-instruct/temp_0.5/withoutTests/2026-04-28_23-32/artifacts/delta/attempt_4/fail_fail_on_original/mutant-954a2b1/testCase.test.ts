import Delta from '../../../../../../../../../../../subject_repositories/delta/src/Delta';

describe('Delta', () => {
  it('should correctly compose with another delta when firstOther is null', () => {
    const delta1 = new Delta();
    delta1.retain(5);
    const delta2 = new Delta();
    const composedDelta = delta1.compose(delta2);
    expect(composedDelta.ops.length).toBe(1);
    expect(composedDelta.ops[0].retain).toBe(5);
  });
});