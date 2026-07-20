import Delta from '../../../../../../../../../../../subject_repositories/delta/src/Delta';

describe('Delta', () => {
  it('transform with embed', () => {
    Delta.registerEmbed('test', {
      compose: (a, b) => a,
      transform: (a, b, priority) => b,
      invert: (a, b) => a,
    });
    const delta1 = new Delta().retain({ test: { value: 'a' } });
    const delta2 = new Delta().retain({ test: { value: 'b' } });
    const result = delta1.transform(delta2);
    // This line should fail on the mutated code
    expect(Object.keys(result.ops[0].retain).length).toBe(1);
    Delta.unregisterEmbed('test');
  });
});