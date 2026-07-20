import Delta from '../../../../../../../../../../../subject_repositories/delta/src/Delta';

describe('Delta', () => {
  it('should correctly transform retain data', () => {
    Delta.registerEmbed('test', {
      compose: (a, b, keepNull) => b,
      invert: (a, b) => b,
      transform: (a, b, priority) => priority ? b : a,
    });
    const delta1 = new Delta().retain({ test: 'data1' });
    const delta2 = new Delta().retain({ test: 'data2' });
    const transformedDelta = delta1.transform(delta2);
    expect(transformedDelta.ops[0].retain).toEqual({ test: 'data2' });
  });
});