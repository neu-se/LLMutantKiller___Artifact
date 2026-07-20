import Delta from '../../../../../../../../../../../subject_repositories/delta/src/Delta';

describe('Delta', () => {
  it('should not retain a non-positive length', () => {
    const delta = new Delta();
    expect(() => delta.retain(0)).not.toThrow();
    expect(delta.ops).toEqual([]);
    expect(() => delta.retain(-1)).not.toThrow();
    expect(delta.ops).toEqual([]);
    expect(delta.retain(0).ops).toEqual([]);
  });
});