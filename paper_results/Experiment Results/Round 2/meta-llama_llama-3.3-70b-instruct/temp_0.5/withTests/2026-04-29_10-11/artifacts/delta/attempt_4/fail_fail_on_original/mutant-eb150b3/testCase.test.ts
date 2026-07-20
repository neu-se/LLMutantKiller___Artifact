import Delta from '../../../../../../../../../../../subject_repositories/delta/src/Delta.ts';

describe('Delta compose with embed handler', () => {
  it('should compose embeds correctly', () => {
    Delta.registerEmbed('test', {
      compose: (a, b, keepNull) => {
        if (a === null) {
          return b;
        }
        if (b === null) {
          return a;
        }
        return { ...a, ...b };
      },
      invert: (a, b) => {
        if (a === null) {
          return b;
        }
        if (b === null) {
          return a;
        }
        return a;
      },
      transform: (a, b, priority) => {
        if (priority) {
          return b;
        }
        return a;
      },
    });

    const delta1 = new Delta().insert({ test: { a: 1 } });
    const delta2 = new Delta().retain(1, { test: { b: 2 } });

    const composed = delta1.compose(delta2);

    expect(composed.ops[0].insert.test).toEqual({ a: 1, b: 2 });

    Delta.unregisterEmbed('test');
  });
});