import Delta from '../../../../../../../../../../../subject_repositories/delta/src/Delta';

describe('Delta', () => {
  it('should handle compose correctly when firstOther.retain is a number and firstOther.attributes is null', () => {
    const delta1 = new Delta();
    delta1.insert('Hello');
    const delta2 = new Delta();
    delta2.retain(1);
    delta2.ops[0].attributes = null;
    const composedDelta = delta1.compose(delta2);
    expect(composedDelta.ops.length).toBe(1);
    expect(composedDelta.ops[0].insert).toBe('Hello');
    const delta3 = new Delta();
    delta3.retain(1);
    delta3.ops[0].attributes = null;
    const composedDelta2 = delta3.compose(delta2);
    expect(composedDelta2.ops.length).toBe(1);
    expect(composedDelta2.ops[0].retain).toBe(1);
    expect(composedDelta2.ops[0].attributes).toBeNull();
  });
});