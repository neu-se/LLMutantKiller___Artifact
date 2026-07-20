import Delta from '../../../../../../../../../../../subject_repositories/delta/src/Delta';

describe('Delta', () => {
  it('should not retain a non-positive length', () => {
    const delta = new Delta();
    const op = { retain: 0 };
    expect(() => delta.retain(0)).not.toThrow();
    expect(delta.ops).toEqual([]);
  });
});