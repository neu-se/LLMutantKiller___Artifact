import Delta from '../../../../../../../../../../../subject_repositories/delta/src/Delta';

describe('Delta', () => {
  it('should transform correctly when thisData is an object and otherData is null', () => {
    Delta.registerEmbed('embed', {
      compose: (a, _, keepNull) => keepNull ? a : a,
      invert: (a, b) => a,
      transform: (a, b, priority) => priority ? b : a,
    });
    const delta1 = new Delta();
    delta1.retain({ embed: 'data1' }, {});
    const delta2 = new Delta();
    delta2.retain(null, {});
    const result = delta1.transform(delta2);
    expect(result.ops[0].retain).toEqual({ embed: 'data1' });
  });
});