import Delta from '../../../../../../../../../../../subject_repositories/delta/src/Delta';

describe('Delta', () => {
  it('should not retain a non-positive length', () => {
    const delta = new Delta();
    const originalOps = delta.ops;
    delta.retain(0);
    expect(delta.ops).toEqual(originalOps);
    delta.retain(-1);
    expect(delta.ops).toEqual(originalOps);
  });
});