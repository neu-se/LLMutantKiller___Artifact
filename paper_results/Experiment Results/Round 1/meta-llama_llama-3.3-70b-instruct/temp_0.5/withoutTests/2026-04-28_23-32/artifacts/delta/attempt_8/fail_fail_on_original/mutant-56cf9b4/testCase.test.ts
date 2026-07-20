import Delta from '../../../../../../../../../../../subject_repositories/delta/src/Delta';

describe('Delta', () => {
  it('should correctly handle the invert method', () => {
    const base = new Delta();
    base.insert('Hello, World!');
    const delta = new Delta();
    delta.retain(13);
    const inverted = delta.invert(base);
    expect(inverted.ops[0].delete).toBeDefined();
    expect(inverted.ops[1]).toBeDefined();
  });
});