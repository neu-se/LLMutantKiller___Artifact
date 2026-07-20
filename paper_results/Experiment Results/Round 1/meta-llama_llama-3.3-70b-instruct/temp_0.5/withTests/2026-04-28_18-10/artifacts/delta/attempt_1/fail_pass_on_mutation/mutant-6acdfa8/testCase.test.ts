import Delta from '../../../../../../../../../../../subject_repositories/delta/src/Delta';

describe('Delta', () => {
  it('should correctly handle retain with attributes', () => {
    const delta = new Delta().retain(1, { bold: true });
    expect(delta.ops.length).toEqual(1);
    expect(delta.ops[0]).toEqual({ retain: 1, attributes: { bold: true } });
  });

  it('should correctly handle retain with empty attributes', () => {
    const delta = new Delta().retain(1, {});
    expect(delta.ops.length).toEqual(1);
    expect(delta.ops[0]).toEqual({ retain: 1 });
  });
});