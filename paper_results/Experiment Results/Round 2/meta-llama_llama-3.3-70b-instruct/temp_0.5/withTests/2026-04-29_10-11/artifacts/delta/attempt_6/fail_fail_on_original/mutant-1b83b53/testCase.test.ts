import Delta from '../../../../../../../../../../../subject_repositories/delta/src/Delta';

describe('Delta', () => {
  it('compose with custom embed handler', () => {
    Delta.registerEmbed('test', {
      compose: (a: any, b: any, keepNull: boolean) => {
        if (keepNull) {
          return { ...a, ...b };
        }
        return { ...a, ...b };
      },
      transform: (a: any, b: any, priority: boolean) => {
        return { ...a, ...b };
      },
      invert: (a: any, b: any) => {
        return { ...a, ...b };
      },
    });

    const delta1 = new Delta().insert({ test: 'bar' });
    const delta2 = new Delta().retain({ test: 'qux' });

    const composed = delta1.compose(delta2);
    expect(composed.ops[0].insert).toEqual({ test: 'qux' });

    Delta.unregisterEmbed('test');
  });
});