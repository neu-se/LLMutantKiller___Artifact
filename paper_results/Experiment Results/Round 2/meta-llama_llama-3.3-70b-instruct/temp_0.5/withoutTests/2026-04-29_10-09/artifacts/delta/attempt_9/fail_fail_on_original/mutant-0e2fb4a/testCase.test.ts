import Delta from '../../../../../../../../../../../subject_repositories/delta/src/Delta';

describe('Delta', () => {
  it('should correctly handle retain operations in invert method', () => {
    const baseDelta = new Delta();
    baseDelta.insert('Test');
    const delta = new Delta();
    delta.retain(1, null);
    const invertedDelta = delta.invert(baseDelta);
    expect(invertedDelta.ops).toEqual([{ delete: 1 }]);
  });
});