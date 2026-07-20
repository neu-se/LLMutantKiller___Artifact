import Delta from '../../../../../../../../../../../subject_repositories/delta/src/Delta';

describe('Delta', () => {
  it('should correctly invert a delta with a delete operation and a following retain operation with attributes', () => {
    const base = new Delta().insert('Hello, World!', { bold: true });
    const delta = new Delta().delete(5).retain(8, { italic: true });
    const inverted = delta.invert(base);
    expect(inverted.ops).toEqual([
      { insert: 'World' },
      { retain: 8, attributes: { italic: null } },
    ]);
  });
});