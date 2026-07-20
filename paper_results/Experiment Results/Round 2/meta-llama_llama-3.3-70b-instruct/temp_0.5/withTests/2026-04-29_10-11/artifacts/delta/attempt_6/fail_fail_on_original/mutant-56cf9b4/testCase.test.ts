import Delta from '../../../../../../../../../../../subject_repositories/delta/src/Delta';

describe('Delta', () => {
  it('should correctly invert a delta with a retain operation and attributes when op.delete is present and condition is met', () => {
    const base = new Delta().insert('Hello, World!', { bold: true });
    const delta = new Delta().retain(5, { italic: true }).delete(5);
    const expected = delta.invert(base);
    const base2 = new Delta().insert('Hello, World!');
    const delta2 = new Delta().retain(5).delete(5);
    const expected2 = delta2.invert(base2);
    expect(expected.ops).toEqual(expected2.ops);
  });
});