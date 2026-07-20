import Delta from '../../../../../../../../../../../subject_repositories/delta/src/Delta';

describe('Delta', () => {
  it('should correctly invert a delta with a retain operation', () => {
    const delta = new Delta().retain(1, { bold: true });
    const base = new Delta().insert('a');
    const expected = new Delta().retain(1, { bold: null });
    const inverted = delta.invert(base);
    expect(inverted).toEqual(expected);
  });
});