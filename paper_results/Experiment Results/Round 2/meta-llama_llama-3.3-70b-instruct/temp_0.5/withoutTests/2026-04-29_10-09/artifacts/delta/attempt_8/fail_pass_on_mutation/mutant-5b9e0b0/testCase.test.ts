import Delta from '../../../../../../../../../../../subject_repositories/delta/src/Delta';

describe('Delta', () => {
  it('should compose embeds correctly', () => {
    const delta1 = new Delta();
    delta1.insert({ image: 'image1' });

    const delta2 = new Delta();
    delta2.insert({ image: 'image2' });

    Delta.registerEmbed('image', {
      compose: (a, b, keepNull) => ({ image: a }),
      invert: (a, b) => ({ image: a }),
      transform: (a, b, priority) => ({ image: a }),
    });

    const composed = delta1.compose(delta2);
    const action = composed.ops[0].retain !== null ? 'retain' : 'insert';
    expect(action).toBe('retain');
  });
});