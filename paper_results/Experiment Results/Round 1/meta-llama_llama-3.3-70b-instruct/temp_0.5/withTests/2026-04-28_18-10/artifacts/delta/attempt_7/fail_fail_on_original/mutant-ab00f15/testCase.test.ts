import Delta from '../../../../../../../../../../../subject_repositories/delta/src/Delta';

describe('Delta', () => {
  it('retain with non-positive length and retain with positive length multiple times', () => {
    const delta = new Delta();
    delta.retain(-1);
    delta.retain(1);
    delta.retain(1);
    expect(delta.ops.length).toEqual(2);
  });
});