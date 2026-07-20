import Delta from '../../../../../../../../../../../subject_repositories/delta/src/Delta';

describe('Delta', () => {
  it('transform with embed', () => {
    Delta.registerEmbed('test', {
      compose: (a, b) => a,
      transform: (a, b, priority) => b,
      invert: (a, b) => a,
    });
    const delta1 = new Delta().retain({ test: { value: 'a' } });
    const delta2 = new Delta().retain({ other: { value: 'b' } });
    const result = delta1.transform(delta2);
    // This line should fail on the mutated code
    expect(() => result).toThrowError('no handlers for embed type "other"');
    Delta.unregisterEmbed('test');
  });
});