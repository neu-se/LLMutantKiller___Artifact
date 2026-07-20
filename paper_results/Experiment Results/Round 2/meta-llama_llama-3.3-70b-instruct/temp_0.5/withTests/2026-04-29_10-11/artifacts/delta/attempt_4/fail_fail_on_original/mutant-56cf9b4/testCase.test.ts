import Delta from '../../../../../../../../../../../subject_repositories/delta/src/Delta';

describe('Delta', () => {
  it('should correctly invert a delta with a delete operation', () => {
    const base = new Delta().insert('Hello, World!');
    const delta = new Delta().delete(5);
    const inverted = delta.invert(base);
    expect(inverted.ops).toEqual([
      { retain: 5 },
      { insert: 'World' },
    ]);
  });
});