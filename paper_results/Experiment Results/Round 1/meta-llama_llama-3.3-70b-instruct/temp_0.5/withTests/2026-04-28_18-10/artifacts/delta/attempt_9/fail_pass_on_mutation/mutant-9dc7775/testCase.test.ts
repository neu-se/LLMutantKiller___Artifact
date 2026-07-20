import Delta from '../../../../../../../../../../../subject_repositories/delta/src/Delta';

describe('Delta', () => {
  it('should compose two embeds correctly', () => {
    Delta.registerEmbed('embed', {
      compose: (a, b, keepNull) => a,
      invert: (a, b) => a,
      transform: (a, b, priority) => a,
    });
    const delta1 = new Delta().insert({ embed: { foo: 'bar' } });
    const delta2 = new Delta().retain({ embed: { foo: 'baz' } });
    const result = delta1.compose(delta2);
    expect(result.ops[0].insert).toEqual({ embed: { foo: 'bar' } });
    Delta.unregisterEmbed('embed');
  });
});