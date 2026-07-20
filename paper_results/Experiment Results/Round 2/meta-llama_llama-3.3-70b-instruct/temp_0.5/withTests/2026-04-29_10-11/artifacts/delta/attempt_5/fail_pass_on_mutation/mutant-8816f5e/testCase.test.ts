import Delta from '../../../../../../../../../../../subject_repositories/delta/src/Delta';

describe('Delta', () => {
  it('transform with embed handler and both thisData and otherData are objects', () => {
    Delta.registerEmbed('test', {
      compose: (a, b, keepNull) => a,
      transform: (a, b, priority) => b,
      invert: (a, b) => a,
    });

    const delta1 = new Delta().retain({ test: { a: 1 } });
    const delta2 = new Delta().retain({ test: { b: 2 } });

    const result = delta1.transform(delta2);
    expect(result.ops[0].retain).toEqual({ test: { b: 2 } });

    Delta.unregisterEmbed('test');
  });
});