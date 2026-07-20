import { Delta } from '../../../src/Delta';

describe('Delta', () => {
  it('should correctly compose two deltas with embeds', () => {
    const delta1 = new Delta();
    const delta2 = new Delta();
    Delta.registerEmbed('test', {
      compose: (a, b, keepNull) => a,
      invert: (a, b) => a,
      transform: (a, b, priority) => a,
    });
    delta1.retain({ test: 'value1' });
    delta2.retain({ test: 'value2' });
    const composed = delta1.compose(delta2);
    expect(composed.ops[0].retain).toEqual({ test: 'value1' });
  });
});