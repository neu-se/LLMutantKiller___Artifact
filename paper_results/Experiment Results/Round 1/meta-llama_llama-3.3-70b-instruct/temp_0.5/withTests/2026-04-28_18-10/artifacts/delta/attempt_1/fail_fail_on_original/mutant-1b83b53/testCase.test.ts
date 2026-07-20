import Delta from '../../../../../../../../../../../subject_repositories/delta/src/Delta';

describe('Delta', () => {
  it('compose with embed handler', () => {
    Delta.registerEmbed('test', {
      compose: (a, b, keepNull) => {
        if (keepNull) {
          return { ...a, ...b };
        }
        return { ...a };
      },
      invert: (a, b) => a,
      transform: (a, b, priority) => a,
    });

    const delta1 = new Delta().insert({ test: { foo: 'bar' } });
    const delta2 = new Delta().retain({ test: { baz: 'qux' } });

    const composed = delta1.compose(delta2);

    expect(composed.ops[0].insert).toEqual({ test: { foo: 'bar', baz: 'qux' } });

    Delta.unregisterEmbed('test');
  });
});