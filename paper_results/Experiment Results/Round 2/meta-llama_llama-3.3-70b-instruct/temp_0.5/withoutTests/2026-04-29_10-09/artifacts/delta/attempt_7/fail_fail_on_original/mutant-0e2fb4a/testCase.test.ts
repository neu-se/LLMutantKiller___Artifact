import Delta from '../../../../../../../../../../../subject_repositories/delta/src/Delta';

describe('Delta', () => {
  it('should correctly handle retain operations in invert method', () => {
    const baseDelta = new Delta();
    baseDelta.insert('Test');
    const delta = new Delta();
    delta.retain(1);
    const invertedDelta = delta.invert(baseDelta);
    expect(invertedDelta.ops).toEqual([{ delete: 1 }]);
    const baseDelta2 = new Delta();
    baseDelta2.insert('Test');
    const delta2 = new Delta();
    delta2.retain(1, { test: 'Test' });
    const invertedDelta2 = delta2.invert(baseDelta2);
    expect(invertedDelta2.ops).not.toEqual([{ delete: 1 }]);
  });
});