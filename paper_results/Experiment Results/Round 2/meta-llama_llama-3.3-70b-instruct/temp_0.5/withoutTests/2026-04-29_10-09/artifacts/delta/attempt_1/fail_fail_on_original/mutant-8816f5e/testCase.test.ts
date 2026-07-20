import Delta from '../../../Delta';

describe('Delta', () => {
  it('should correctly transform embeds', () => {
    const delta1 = new Delta();
    delta1.retain({ embed: 'data1' });

    const delta2 = new Delta();
    delta2.retain({ embed: 'data2' });

    Delta.registerEmbed('embed', {
      compose: (a, b, keepNull) => a,
      invert: (a, b) => a,
      transform: (a, b, priority) => priority? b : a,
    });

    const transformedDelta = delta1.transform(delta2, true);
    expect(transformedDelta.ops[0].retain).toEqual({ embed: 'data2' });
  });
});