import Delta from '../../../../../../../../../../../subject_repositories/delta/src/Delta';

describe('Delta', () => {
  it('transform with embed handler and thisData is object, otherData is null', () => {
    Delta.registerEmbed('test', {
      compose: (a, b, keepNull) => a,
      transform: (a, b, priority) => b,
      invert: (a, b) => a,
    });

    const delta1 = new Delta().retain({ test: { a: 1 } });
    const delta2 = new Delta().retain(null);

    const result = delta1.transform(delta2);
    expect(result.ops[0].retain).toEqual(null);

    Delta.unregisterEmbed('test');
  });
});