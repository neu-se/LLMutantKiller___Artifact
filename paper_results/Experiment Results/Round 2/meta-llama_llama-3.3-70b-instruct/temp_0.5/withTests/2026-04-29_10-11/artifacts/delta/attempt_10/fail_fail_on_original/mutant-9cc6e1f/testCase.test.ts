import Delta from '../../../../../../../../../../../subject_repositories/delta/src/Delta';

describe('transform', () => {
  it('should handle embeds correctly', () => {
    Delta.registerEmbed('embed', {
      compose: (a, b) => ({ ...a, ...b }),
      transform: (a, b, priority) => ({ ...a, ...b }),
      invert: (a, b) => ({ ...a, ...b }),
    });
    const a = new Delta().insert({ embed: { foo: 'bar' } });
    const b = new Delta().retain({ embed: { foo: 'baz' } });
    const expected = new Delta().retain({ embed: { foo: 'bar', foo: 'baz' } });
    expect(a.transform(b)).toEqual(expected);
  });
});