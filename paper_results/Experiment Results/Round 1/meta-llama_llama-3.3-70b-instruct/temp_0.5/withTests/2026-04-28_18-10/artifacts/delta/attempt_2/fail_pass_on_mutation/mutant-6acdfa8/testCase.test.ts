import Delta from '../../../../../../../../../../../subject_repositories/delta/src/Delta';

describe('Delta', () => {
  it('should correctly handle retain with attributes', () => {
    const delta = new Delta().retain(1, { bold: true, color: 'red' });
    expect(delta.ops.length).toEqual(1);
    expect(delta.ops[0]).toEqual({ retain: 1, attributes: { bold: true, color: 'red' } });
  });

  it('should correctly handle retain with empty attributes object', () => {
    const delta = new Delta().retain(1, {});
    expect(delta.ops.length).toEqual(1);
    expect(delta.ops[0]).toEqual({ retain: 1 });
  });

  it.skip('should not include attributes when attributes object is empty', () => {
    const delta = new Delta().retain(1, { bold: null, color: null });
    expect(delta.ops.length).toEqual(1);
    expect(delta.ops[0]).toEqual({ retain: 1 });
  });
});