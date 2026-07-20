import Delta from '../../../../../../../../../../../subject_repositories/delta/src/Delta';

describe('Delta', () => {
  it('should correctly compose deltas with embed operations', () => {
    Delta.registerEmbed('image', {
      compose: (a, b, keepNull) => a,
      invert: (a, b) => a,
      transform: (a, b, priority) => a,
    });

    const delta1 = new Delta();
    delta1.retain({ image: 'image1' });

    const delta2 = new Delta();
    delta2.retain({ image: 'image2' });

    const composedDelta = delta1.compose(delta2);

    expect(composedDelta.ops).toEqual([
      { retain: { image: 'image1' } },
      { retain: { image: 'image2' } },
    ]);
  });
});