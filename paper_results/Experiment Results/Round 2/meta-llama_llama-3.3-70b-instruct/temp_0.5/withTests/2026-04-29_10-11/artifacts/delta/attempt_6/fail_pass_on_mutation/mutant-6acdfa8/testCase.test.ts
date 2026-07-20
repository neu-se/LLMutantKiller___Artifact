import Delta from '../../../../../../../../../../../subject_repositories/delta/src/Delta';

describe('Delta', () => {
  it('retain with undefined attributes', () => {
    const delta = new Delta().retain(1, undefined);
    const expected = new Delta().retain(1);
    expect(delta.ops.length).toBe(1);
    expect(delta.ops[0]).toEqual({ retain: 1 });
  });
});