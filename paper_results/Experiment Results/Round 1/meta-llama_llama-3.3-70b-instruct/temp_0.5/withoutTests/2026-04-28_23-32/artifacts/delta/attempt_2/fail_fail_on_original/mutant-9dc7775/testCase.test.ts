import { Delta } from '../../../../../../../../../../../subject_repositories/delta/src/Delta';

describe('Delta transform', () => {
  it('should transform correctly when both retain data are objects', () => {
    const delta1 = new Delta();
    delta1.retain({ test: 'value1' });
    const delta2 = new Delta();
    delta2.retain({ test: 'value2' });
    const handler = {
      compose: (a: any, b: any, keepNull: boolean) => ({ ...a, ...b }),
      invert: (a: any, b: any) => ({ ...a, ...b }),
      transform: (a: any, b: any, priority: boolean) => ({ ...a, ...b }),
    };
    Delta.registerEmbed('test', handler);
    const transformedDelta = delta1.transform(delta2);
    expect(transformedDelta.ops[0].retain).toEqual({ test: 'value1' });
  });
});