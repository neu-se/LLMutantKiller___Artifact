import Delta from '../../../../../../../../../../../subject_repositories/delta/src/Delta';

describe('Delta', () => {
  it('should correctly compose embeds when the action is "retain"', () => {
    Delta.registerEmbed('image', {
      compose: (a, b, keepNull) => {
        if (keepNull) {
          return a;
        }
        return b;
      },
      invert: (a, b) => a,
      transform: (a, b, priority) => b,
    });
    const delta1 = new Delta();
    delta1.retain({ image: 'image1' });
    const delta2 = new Delta();
    delta2.retain({ image: 'image2' });
    const composedDelta = delta1.compose(delta2);
    expect(composedDelta.ops[0].retain).toEqual({ image: 'image1' });
    expect(composedDelta.ops.length).toBe(1);
    const delta3 = new Delta();
    delta3.retain({ image: 'image3' });
    const composedDelta2 = delta1.compose(delta3);
    expect(composedDelta2.ops[0].retain).toEqual({ image: 'image1' });
  });
});