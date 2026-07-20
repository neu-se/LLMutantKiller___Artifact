import Delta from '../../../../../../../../../../../subject_repositories/delta/src/Delta';

describe('transform', () => {
  it('should handle null and object correctly', () => {
    Delta.registerEmbed('test', {
      compose: (a, b) => a,
      transform: (a, b, priority) => a === null ? b : a,
      invert: (a, b) => a,
    });
    const delta1 = new Delta().retain({ test: null });
    const delta2 = new Delta().retain({ test: 'object' });
    const transformedDelta = delta1.transform(delta2);
    expect(transformedDelta.ops[0].retain).toEqual({ test: 'object' });
  });
});