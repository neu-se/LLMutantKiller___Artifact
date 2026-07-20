import Delta from '../../../../../../../../../../../subject_repositories/delta/src/Delta';

describe('Delta', () => {
  it('should correctly handle retain with empty attributes object', () => {
    const delta = new Delta().retain(1, { });
    expect(delta.ops.length).toEqual(1);
    expect(delta.ops[0]).toEqual({ retain: 1 });
  });

  it.skip('should correctly handle retain with attributes object having only null values', () => {
    const delta = new Delta().retain(1, { bold: null, color: null });
    expect(delta.ops.length).toEqual(1);
    expect(delta.ops[0]).toEqual({ retain: 1 });
  });

  it.skip('should not include attributes when attributes object is empty and has a null property', () => {
    const delta = new Delta().retain(1, { bold: null });
    expect(delta.ops.length).toEqual(1);
    expect(delta.ops[0]).toEqual({ retain: 1 });
  });
});