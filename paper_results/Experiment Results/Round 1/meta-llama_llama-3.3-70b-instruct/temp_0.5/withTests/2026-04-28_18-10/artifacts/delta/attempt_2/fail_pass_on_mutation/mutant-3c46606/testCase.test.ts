import Delta from '../../../../../../../../../../../subject_repositories/delta/src/Delta';

describe('Delta', () => {
  it('transform with embed handler and priority', () => {
    Delta.registerEmbed('test', {
      compose: (a, b) => a,
      transform: (a, b, priority) => (priority? a : b),
      invert: (a, b) => a,
    });
    const deltaA = new Delta().retain({ test: 'a' });
    const deltaB = new Delta().retain({ test: 'b' });
    const result = deltaA.transform(deltaB, true);
    expect(result.ops[0].retain.test).toBe('a');
    Delta.unregisterEmbed('test');
  });
});