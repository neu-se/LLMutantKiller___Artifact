import Delta from '../../../../../../../../../../../subject_repositories/delta/src/Delta';

describe('Delta', () => {
  it('retain with falsy attributes', () => {
    const delta = new Delta().retain(1, false);
    const expected = new Delta().retain(1);
    expect(delta.ops[0].attributes).toBeUndefined();
  });
});