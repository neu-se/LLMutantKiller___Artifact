import Delta from '../../../../../../../../../../../subject_repositories/delta/src/Delta';

describe('transform()', () => {
  it('should handle retain with embed and object correctly', () => {
    Delta.registerEmbed('embed', {
      compose: (a, b) => b,
      transform: (a, b, priority) => a,
      invert: (a, b) => b,
    });
    const a = new Delta().retain({ embed: { foo: 'bar' } });
    const b = new Delta().retain({ embed: { foo: 'baz' } });
    const expected = new Delta().retain({ embed: { foo: 'bar' } });
    expect(a.transform(b)).toEqual(expected);
    Delta.unregisterEmbed('embed');
  });
});