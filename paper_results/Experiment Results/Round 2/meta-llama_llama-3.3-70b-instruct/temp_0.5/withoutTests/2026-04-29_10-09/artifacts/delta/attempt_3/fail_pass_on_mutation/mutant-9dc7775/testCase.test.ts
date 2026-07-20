import Delta from '../../../../../../../../../../../subject_repositories/delta/src/Delta';

describe('Delta', () => {
  it('should handle transform correctly when thisData and otherData are objects', () => {
    Delta.registerEmbed('a', {
      compose: (a, b, keepNull) => a,
      invert: (a, b) => a,
      transform: (a, b, priority) => priority? b : a,
    });
    const delta1 = new Delta();
    delta1.retain({ a: 'value1' });
    const delta2 = new Delta();
    delta2.retain({ a: 'value2' });
    const transformedDelta = delta1.transform(delta2, true);
    expect(transformedDelta.ops[0].retain).toEqual({ a: 'value2' });
    Delta.unregisterEmbed('a');
  });
});