import Delta from '../../../../../../../../../../../subject_repositories/delta/src/Delta';

describe('Delta', () => {
  it('retain with attributes that has no keys', () => {
    const delta = new Delta().retain(1, {});
    const expected = new Delta().retain(1);
    expect(delta.ops[0].attributes).toBeUndefined();
  });
});