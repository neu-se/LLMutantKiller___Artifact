import Delta from '../../../../../../../../../../../subject_repositories/delta/src/Delta';

describe('Delta', () => {
  it('should correctly compose embeds when the action is "retain"', () => {
    const delta1 = new Delta();
    const delta2 = new Delta();
    delta1.insert({ image: 'image1' });
    delta2.retain({ image: 'image2' });
    const composedDelta = delta1.compose(delta2);
    expect(composedDelta.ops[0].retain).toEqual({ image: expect.any(Function) });
  });
});