import Delta from '../../../../../../../../../../../subject_repositories/delta/src/Delta';

describe('Delta', () => {
  it('should correctly handle retain with empty attributes object and other attributes', () => {
    const delta = new Delta().retain(1, { a: null, b: 'value' });
    expect(delta.ops.length).toEqual(1);
    expect(delta.ops[0]).toEqual({ retain: 1, attributes: { b: 'value' } });
  });
});