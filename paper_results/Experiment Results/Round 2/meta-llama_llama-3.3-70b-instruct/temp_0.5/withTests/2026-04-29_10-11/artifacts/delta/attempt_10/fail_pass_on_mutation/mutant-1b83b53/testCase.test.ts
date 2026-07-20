import Delta from '../../../../../../../../../../../subject_repositories/delta/src/Delta';

describe('Delta', () => {
  it('compose with custom embed handler and action is retain with embed type and data', () => {
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

    const delta1 = new Delta().insert({ test: { foo: 'bar' } });
    const delta2 = new Delta().retain({ test: { baz: 'qux' } });

    const composed = delta1.compose(delta2);
    expect(composed.ops[0].insert['test']).toEqual({ foo: 'bar', baz: 'qux' });

    Delta.unregisterEmbed('test');
  });
});