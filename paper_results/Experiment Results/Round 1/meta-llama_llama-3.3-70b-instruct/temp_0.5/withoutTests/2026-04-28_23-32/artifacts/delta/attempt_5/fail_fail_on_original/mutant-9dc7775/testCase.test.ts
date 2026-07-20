import Delta from '../../../../../../../../../../../subject_repositories/delta/src/Delta';

describe('Delta transform', () => {
  it('should transform correctly when both retain data are objects', () => {
    const delta1 = new Delta();
    delta1.retain({ test: 'value1' }, null);
    const delta2 = new Delta();
    delta2.retain({ test: 'value2' }, null);
    const handler = {
      compose: (a: any, b: any, keepNull: boolean) => ({ ...a, ...b }),
      invert: (a: any, b: any) => ({ ...a, ...b }),
      transform: (a: any, b: any, priority: boolean) => {
        if (a !== null && b !== null && typeof a === 'object' && typeof b === 'object') {
          return { ...a, ...b };
        } else {
          return a;
        }
      },
    };
    Delta.registerEmbed('test', handler);
    const transformedDelta = delta1.transform(delta2, true);
    expect(transformedDelta.ops[0].retain).toEqual({ test: 'value1value2' });
  });
});