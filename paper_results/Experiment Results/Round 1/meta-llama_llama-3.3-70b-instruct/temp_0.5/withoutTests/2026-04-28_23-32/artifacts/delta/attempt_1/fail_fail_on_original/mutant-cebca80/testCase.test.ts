import { Delta } from '../../../../../../../../../../../subject_repositories/delta/src/Delta';

describe('Delta', () => {
  it('should correctly handle retain operations in invert method', () => {
    const baseDelta = new Delta();
    baseDelta.insert('Hello, World!', { bold: true });
    const delta = new Delta();
    delta.retain({ image: 'image1' }, { bold: true });
    const invertedDelta = delta.invert(baseDelta);
    expect(invertedDelta.ops.length).toBe(1);
    expect(invertedDelta.ops[0].retain).toBeUndefined();
    expect(invertedDelta.ops[0].insert).toBeUndefined();
    expect(invertedDelta.ops[0].delete).toBe(1);
  });
});