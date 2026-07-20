import Delta from '../../../../../../../../../../../subject_repositories/delta/src/Delta';

describe('Delta', () => {
  it('should correctly handle retain with attributes', () => {
    const delta = new Delta().retain(1, { bold: true });
    expect(delta.ops.length).toEqual(1);
    expect(delta.ops[0]).toEqual({ retain: 1, attributes: { bold: true } });
  });

  it('should not include attributes when attributes is null', () => {
    const delta = new Delta().retain(1, null);
    expect(delta.ops.length).toEqual(1);
    expect(delta.ops[0]).toEqual({ retain: 1 });
  });

  it('should include attributes when attributes is not null or empty', () => {
    const delta = new Delta().retain(1, { bold: true, color: 'red' });
    expect(delta.ops.length).toEqual(1);
    expect(delta.ops[0]).toEqual({ retain: 1, attributes: { bold: true, color: 'red' } });
  });
});