import Delta from '../../../../../../../../../../../subject_repositories/delta/src/Delta';

describe('Delta', () => {
  it('should not retain a non-positive length', () => {
    const delta = new Delta();
    delta.retain(0);
    expect(delta.ops.length).toBe(0);
    delta.retain(-1);
    expect(delta.ops.length).toBe(0);
    const delta2 = new Delta();
    delta2.retain(0);
    expect(delta2.ops.length).toBe(0);
    delta2.retain(-1);
    expect(delta2.ops.length).toBe(0);
    const delta3 = new Delta();
    delta3.retain(1);
    expect(delta3.ops.length).toBe(1);
    delta3.retain(0);
    expect(delta3.ops.length).toBe(1);
  });
});