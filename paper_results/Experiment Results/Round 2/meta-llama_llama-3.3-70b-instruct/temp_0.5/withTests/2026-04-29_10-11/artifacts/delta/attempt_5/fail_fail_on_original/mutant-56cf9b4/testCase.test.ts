import Delta from '../../../../../../../../../../../subject_repositories/delta/src/Delta';

describe('Delta', () => {
  it('should correctly invert a delta with a retain operation and attributes when op.delete is present', () => {
    const base = new Delta().insert('Hello, World!', { bold: true });
    const delta = new Delta().retain(5, { italic: true }).delete(5);
    const inverted = delta.invert(base);
    expect(inverted.ops).toEqual([
      { retain: 5, attributes: { italic: null } },
      { insert: 'World' },
    ]);
  });
});