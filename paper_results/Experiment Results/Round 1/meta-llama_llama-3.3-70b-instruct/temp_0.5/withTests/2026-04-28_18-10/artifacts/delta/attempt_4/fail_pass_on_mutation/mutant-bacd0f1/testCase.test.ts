import Delta from '../../../../../../../../../../../subject_repositories/delta/src/Delta';

describe('Delta transform', () => {
  it('should handle otherData correctly', () => {
    Delta.registerEmbed('test', {
      compose: (a, b) => a,
      transform: (a, b, priority) => a,
      invert: (a, b) => a,
    });
    const delta1 = new Delta().retain({ test: 'value' });
    const delta2 = new Delta().retain({ test: null });
    const result = delta1.transform(delta2);
    expect(result.ops[0].retain).toEqual({ test: 'value' });
  });
});