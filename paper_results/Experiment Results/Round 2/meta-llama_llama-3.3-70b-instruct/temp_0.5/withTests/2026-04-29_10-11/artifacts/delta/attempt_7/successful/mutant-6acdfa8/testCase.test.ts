import Delta from '../../../../../../../../../../../subject_repositories/delta/src/Delta';

describe('Delta', () => {
  it('retain with string attributes', () => {
    const delta = new Delta().retain(1, 'string');
    const expected = new Delta().retain(1);
    expect(delta.ops.length).toBe(1);
    expect(delta.ops[0]).toEqual({ retain: 1 });
  });
});