import { Delta } from '../Delta';

describe('Delta transform', () => {
  it('should transform correctly when both retain data are objects', () => {
    const delta1 = new Delta();
    const delta2 = new Delta();
    delta1.retain({ test: 'value1' });
    delta2.retain({ test: 'value2' });
    const handler = {
      compose: (a, b, keepNull) => ({ ...a, ...b }),
      invert: (a, b) => ({ ...a, ...b }),
      transform: (a, b, priority) => ({ ...a, ...b }),
    };
    Delta.registerEmbed('test', handler);
    const transformedDelta = delta1.transform(delta2);
    expect(transformedDelta.ops[0].retain).toEqual({ test: 'value1' });
  });
});