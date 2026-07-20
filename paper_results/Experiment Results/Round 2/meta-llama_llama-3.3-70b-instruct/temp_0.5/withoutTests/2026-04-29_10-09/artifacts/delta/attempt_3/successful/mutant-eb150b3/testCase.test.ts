import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe('Delta', () => {
  it('composes embeds correctly', () => {
    const delta1 = new Delta();
    const delta2 = new Delta();

    delta1.retain({ image: 'image1' });
    delta2.retain({ image: 'image2' });

    Delta.registerEmbed('image', {
      compose: (a: string, b: string, keepNull: boolean) => {
        return keepNull ? a : b;
      },
      invert: (a: string, b: string) => {
        return a;
      },
      transform: (a: string, b: string, priority: boolean) => priority ? b : a,
    });

    const composedDelta = delta1.compose(delta2);

    expect(composedDelta.ops[0].retain).toEqual({ image: 'image1' });
  });
});