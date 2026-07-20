import Delta from '../../../../../../../../../../../subject_repositories/delta/src/Delta';

describe('Delta', () => {
  it('compose with embed', () => {
    Delta.registerEmbed('test', {
      compose: (a: any, b: any, keepNull: boolean) => {
        if (keepNull) {
          return {...a,...b };
        }
        return {...a };
      },
      invert: (a: any, b: any) => a,
      transform: (a: any, b: any, priority: boolean) => a,
    });

    const delta1 = new Delta().insert({ test: { foo: 'bar' } });
    const delta2 = new Delta().retain({ test: { baz: 'qux' } });

    const composed = delta1.compose(delta2);

    expect(composed.ops[0].insert).toBeDefined();
    expect(composed.ops[0].retain).toBeUndefined();

    Delta.unregisterEmbed('test');
  });
});