import Delta from '../../../../../../../../../../../subject_repositories/delta/src/Delta';

describe('Delta', () => {
  it('transform with embed handler', () => {
    Delta.registerEmbed('test', {
      compose: (a: { test: number }, b: { test: number }) => ({ test: a.test + b.test }),
      transform: (a: { test: number }, b: { test: number }, priority: boolean) => ({ test: priority ? a.test : b.test }),
      invert: (a: { test: number }, b: { test: number }) => ({ test: a.test - b.test }),
    });

    const a = new Delta().retain({ test: 5 });
    const b = new Delta().retain({ test: 3 });

    const result = a.transform(b);
    expect(result.ops[0].retain).toEqual({ test: 3 });

    Delta.unregisterEmbed('test');
  });
});