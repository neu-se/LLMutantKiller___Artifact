import Delta from '../../../../../../../../../../../subject_repositories/delta/src/Delta';

describe('Delta', () => {
  it('should not compose embeds when action is insert and embed types are different', () => {
    const delta1 = new Delta().insert({ image: 'image1' });
    const delta2 = new Delta().insert({ video: 'video1' });
    const composedDelta = delta1.compose(delta2);
    expect(composedDelta.ops.length).toBe(2);
    expect(composedDelta.ops[0].insert).toEqual({ image: 'image1' });
    expect(composedDelta.ops[1].insert).toEqual({ video: 'video1' });
  });
});