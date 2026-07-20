import { Delta } from '../../../../../../../../../../../subject_repositories/delta/src/Delta';

describe('Delta', () => {
  it('composes embeds correctly', () => {
    const delta1 = new Delta();
    const delta2 = new Delta();

    delta1.insert({ image: 'image1' });
    delta2.insert({ image: 'image2' });

    Delta.registerEmbed('image', {
      compose: (a, b, keepNull) => {
        if (keepNull) {
          return a;
        }
        return b;
      },
      invert: (a, b) => a,
      transform: (a, b, priority) => priority ? b : a,
    });

    const composedDelta = delta1.compose(delta2);

    expect(composedDelta.ops[0].insert).toEqual({ image: 'image2' });
  });
});