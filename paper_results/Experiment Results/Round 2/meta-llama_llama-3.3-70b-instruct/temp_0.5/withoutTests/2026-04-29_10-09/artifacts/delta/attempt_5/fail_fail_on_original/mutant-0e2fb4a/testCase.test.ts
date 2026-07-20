import Delta from '../../../../../../../../../../../subject_repositories/delta/src/Delta';

describe('Delta', () => {
  it('should correctly handle retain operations in invert method', () => {
    const baseDelta = new Delta();
    baseDelta.insert('Test');
    const delta = new Delta();
    delta.retain({ test: 'Test' });
    const invertedDelta = delta.invert(baseDelta);
    expect(invertedDelta.ops).not.toHaveLength(0);
  });
});