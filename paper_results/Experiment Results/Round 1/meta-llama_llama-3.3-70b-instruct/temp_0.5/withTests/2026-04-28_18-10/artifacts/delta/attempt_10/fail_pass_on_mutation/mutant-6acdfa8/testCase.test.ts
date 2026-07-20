import Delta from '../../../../../../../../../../../subject_repositories/delta/src/Delta';

describe('Delta', () => {
  it('retain with empty attributes object check', () => {
    const delta = new Delta().retain(1, {});
    expect(delta.ops.length).toEqual(1);
    expect(delta.ops[0]).toEqual({ retain: 1 });
  });
});