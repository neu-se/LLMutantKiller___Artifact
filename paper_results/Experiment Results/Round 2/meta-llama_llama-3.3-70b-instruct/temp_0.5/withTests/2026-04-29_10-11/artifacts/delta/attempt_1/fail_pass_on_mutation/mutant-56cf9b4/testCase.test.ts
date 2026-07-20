import Delta from '../../../../../../../../../../../subject_repositories/delta/src/Delta';

describe('Delta', () => {
  it('should correctly invert a delta with a delete operation', () => {
    const base = new Delta().insert('Hello, World!');
    const delta = new Delta().retain(7).delete(5);
    const inverted = delta.invert(base);
    expect(inverted.ops).toEqual([
      { retain: 7 },
      { insert: 'World' },
    ]);
  });
});