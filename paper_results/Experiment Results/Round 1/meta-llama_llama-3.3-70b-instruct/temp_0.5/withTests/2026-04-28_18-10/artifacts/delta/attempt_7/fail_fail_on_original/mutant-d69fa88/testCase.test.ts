import Delta from '../../../../../../../../../../../subject_repositories/delta/src/Delta.ts';

describe('Delta', () => {
  it('should correctly handle the mutation in the invert method', () => {
    const delta = new Delta().retain(1);
    const base = new Delta().insert('a', { bold: true });
    const expected = new Delta().retain(1, { bold: null });
    const inverted = delta.invert(base);
    expect(inverted.ops).toEqual(expected.ops);
  });
});