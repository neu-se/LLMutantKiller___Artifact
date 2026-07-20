import Delta from '../../../../../../../../../../../subject_repositories/delta/src/Delta';

describe('Delta transform', () => {
  it('should handle otherData correctly', () => {
    Delta.registerEmbed('test', {
      compose: (a, b) => a,
      transform: (a, b, priority) => priority? a : b,
      invert: (a, b) => a,
    });
    const delta1 = new Delta().retain({ test: 'value' });
    const delta2 = new Delta().retain({ test: null });
    expect(() => delta1.transform(delta2)).toThrowError('no handlers for embed type "test"');
  });
});