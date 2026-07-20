import Delta from '../../../../../../../../../../../subject_repositories/delta/src/Delta';

describe('Delta', () => {
  it('transform with embed', () => {
    Delta.registerEmbed('test', {
      compose: (a, b) => a,
      transform: (a, b, priority) => b,
      invert: (a, b) => a,
    });
    const delta1 = new Delta().retain({ test: 'a' });
    const delta2 = new Delta().retain({ test: 'b' });
    const result = delta1.transform(delta2);
    expect(result.ops[0].retain).toEqual({ test: 'b' });
    // This line should fail on the mutated code
    expect(result.ops[0].retain).not.toEqual({ test: 'a' });
    Delta.unregisterEmbed('test');
  });
});