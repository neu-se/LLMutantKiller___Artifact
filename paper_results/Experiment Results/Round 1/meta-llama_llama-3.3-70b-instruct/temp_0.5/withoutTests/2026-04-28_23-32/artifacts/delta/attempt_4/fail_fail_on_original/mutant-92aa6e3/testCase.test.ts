import Delta from '../../../../../../../../../../../subject_repositories/delta/src/Delta';

describe('Delta', () => {
  it('should compose embeds when action is retain and embed types are the same', () => {
    const delta1 = new Delta().retain({ image: 'image1' });
    const delta2 = new Delta().retain({ image: 'image2' });
    const composedDelta = delta1.compose(delta2);
    expect(composedDelta.ops.length).toBe(1);
    expect(composedDelta.ops[0].retain).toEqual({ image: expect.any(Object) });
  });
});