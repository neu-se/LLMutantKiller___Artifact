import Delta from '../../../../../../../../../../../subject_repositories/delta/src/Delta';

describe('Delta', () => {
  it('should correctly invert a delta with a retain operation and attributes when op.retain and op.attributes are present', () => {
    const base = new Delta().insert('Hello, World!');
    const delta = new Delta().retain(5, { bold: true });
    const inverted = delta.invert(base);
    expect(inverted.ops).toEqual([
      { retain: 5, attributes: { bold: null } },
    ]);
    const base2 = new Delta().insert('Hello, World!');
    const delta2 = new Delta().retain(5);
    const inverted2 = delta2.invert(base2);
    expect(inverted.ops).not.toEqual(inverted2.ops);
    expect(() => {
      delta.invert(new Delta().retain(5));
    }).toThrowError('no handlers for embed type "undefined"');
  });
});