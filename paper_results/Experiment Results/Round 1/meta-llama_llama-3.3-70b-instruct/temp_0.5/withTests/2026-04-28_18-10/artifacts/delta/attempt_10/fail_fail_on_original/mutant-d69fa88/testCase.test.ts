import Delta from '../../../../../../../../../../../subject_repositories/delta/src/Delta.ts';

describe('Delta', () => {
  it('should correctly handle the mutation in the invert method', () => {
    const delta = new Delta().retain(1, { bold: true });
    const base = new Delta().insert('a', { bold: true, italic: true });
    const expected = new Delta().retain(1, { italic: null });
    const inverted = delta.invert(base);
    expect(inverted.ops).toEqual(expected.ops);
  });
});