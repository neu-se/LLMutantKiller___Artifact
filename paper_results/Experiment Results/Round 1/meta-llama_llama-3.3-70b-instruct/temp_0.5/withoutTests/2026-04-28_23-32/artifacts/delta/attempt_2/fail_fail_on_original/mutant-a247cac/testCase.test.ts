import Delta from '../../../../../../../../../../../subject_repositories/delta/src/Delta';

describe('Delta', () => {
  it('should compose correctly', () => {
    const delta1 = new Delta();
    delta1.retain(1);
    const delta2 = new Delta();
    delta2.retain(1);
    const composed = delta1.compose(delta2);
    expect(composed.ops.length).toBe(1);
    expect(composed.ops[0].retain).toBe(2);

    const delta3 = new Delta();
    delta3.retain(2);
    const composed2 = delta1.compose(delta3);
    expect(composed2.ops.length).toBe(1);
    expect(composed2.ops[0].retain).toBe(3);

    const delta4 = new Delta();
    delta4.retain(2);
    const composed3 = delta1.compose(delta4);
    expect(composed3.ops.length).toBe(1);
    expect(composed3.ops[0].retain).toBe(3);
  });
});