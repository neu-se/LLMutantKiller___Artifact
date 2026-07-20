import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta.ts";

describe('Delta', () => {
  it('should correctly compose deltas with embeds', () => {
    const delta1 = new Delta();
    delta1.retain({ image: 'image1' });
    const delta2 = new Delta();
    delta2.insert({ image: 'image2' });

    Delta.registerEmbed('image', {
      compose: (a: any, b: any, keepNull: boolean) => b,
      invert: (a: any, b: any) => a,
      transform: (a: any, b: any, priority: boolean) => priority ? b : a,
    });

    const composedDelta = delta1.compose(delta2);

    expect(composedDelta.ops[0].retain).toEqual({ image: 'image2' });
  });
});