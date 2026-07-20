import Delta from '../../../../../../../../../../../subject_repositories/delta/src/Delta';

describe('Delta', () => {
  it('should correctly invert a delta with a retain operation and attributes', () => {
    const base = new Delta().insert('Hello, World!');
    const delta = new Delta().retain(13, { italic: true });
    const inverted = delta.invert(base);
    expect(inverted.ops).toEqual([
      { retain: 13, attributes: { italic: null } },
    ]);
    const delta2 = new Delta().retain(13);
    const inverted2 = delta2.invert(base);
    expect(inverted.ops).not.toEqual(inverted2.ops);
  });
});