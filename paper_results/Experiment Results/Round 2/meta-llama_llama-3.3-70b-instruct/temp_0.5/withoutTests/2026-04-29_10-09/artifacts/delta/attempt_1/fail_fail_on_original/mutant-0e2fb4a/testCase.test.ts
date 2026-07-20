import Delta from '../../../src/Delta';

describe('Delta', () => {
  it('should correctly handle retain operations in invert method', () => {
    const baseDelta = new Delta();
    baseDelta.insert('Test');
    const delta = new Delta();
    delta.retain({ test: 'Test' });
    const invertedDelta = delta.invert(baseDelta);
    expect(invertedDelta.ops).toHaveLength(1);
    expect(invertedDelta.ops[0].delete).toBe(1);
  });
});