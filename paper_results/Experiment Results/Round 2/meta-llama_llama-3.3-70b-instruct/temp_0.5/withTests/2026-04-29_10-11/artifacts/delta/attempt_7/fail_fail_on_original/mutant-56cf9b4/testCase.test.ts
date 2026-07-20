import Delta from '../../../../../../../../../../../subject_repositories/delta/src/Delta';

describe('Delta', () => {
  it('should correctly invert a delta with a delete operation when op.retain is present and condition is met', () => {
    const base = new Delta().insert('Hello, World!');
    const delta = new Delta().retain(5).delete(5);
    const inverted = delta.invert(base);
    expect(inverted.ops).toEqual([
      { retain: 5 },
      { insert: 'World' },
    ]);
    const base2 = new Delta().insert('Hello, World!');
    const delta2 = new Delta().delete(5);
    const inverted2 = delta2.invert(base2);
    expect(inverted.ops).not.toEqual(inverted2.ops);
  });
});