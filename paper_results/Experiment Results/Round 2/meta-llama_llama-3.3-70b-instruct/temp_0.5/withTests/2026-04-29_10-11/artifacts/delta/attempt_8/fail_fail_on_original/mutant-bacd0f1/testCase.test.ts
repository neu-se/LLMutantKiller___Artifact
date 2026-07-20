import Delta from '../../../../../../../../../../../subject_repositories/delta/src/Delta';

describe('transform', () => {
  it('should handle null and object correctly', () => {
    Delta.registerEmbed('test', {
      compose: (a, b) => a,
      transform: (a, b, priority) => a === null && b === undefined ? 1 : a,
      invert: (a, b) => a,
    });
    const delta1 = new Delta().retain({ test: null });
    const delta2 = new Delta().retain({ test: undefined });
    const transformedDelta = delta1.transform(delta2);
    expect(transformedDelta.ops[0].retain).toEqual(1);
  });
});