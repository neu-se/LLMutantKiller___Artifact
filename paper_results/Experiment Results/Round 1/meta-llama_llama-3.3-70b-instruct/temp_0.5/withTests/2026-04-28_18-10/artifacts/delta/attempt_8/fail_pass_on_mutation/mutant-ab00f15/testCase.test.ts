import Delta from '../../../../../../../../../../../subject_repositories/delta/src/Delta';

describe('Delta', () => {
  it('retain with positive length and then retain with non-positive length', () => {
    const delta = new Delta();
    delta.retain(1);
    delta.retain(-1);
    expect(delta.ops.length).toEqual(1);
  });
});