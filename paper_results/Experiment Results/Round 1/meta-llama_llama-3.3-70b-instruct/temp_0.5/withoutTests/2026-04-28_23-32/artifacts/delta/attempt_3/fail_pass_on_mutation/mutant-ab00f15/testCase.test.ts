import Delta from '../../../../../../../../../../../subject_repositories/delta/src/Delta';

describe('Delta', () => {
  it('should not retain a non-positive length', () => {
    const delta = new Delta();
    delta.retain(0);
    expect(delta.ops.length).toBe(0);
    delta.retain(-1);
    expect(delta.ops.length).toBe(0);
  });
});