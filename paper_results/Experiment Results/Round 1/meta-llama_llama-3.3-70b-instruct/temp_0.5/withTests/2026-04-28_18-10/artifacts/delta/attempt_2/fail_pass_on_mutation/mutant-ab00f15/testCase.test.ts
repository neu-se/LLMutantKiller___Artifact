import Delta from '../../../../../../../../../../../subject_repositories/delta/src/Delta';

describe('Delta', () => {
  it('retain with non-positive length', () => {
    const delta = new Delta();
    delta.retain(0);
    expect(delta.ops.length).toEqual(0);
  });
});