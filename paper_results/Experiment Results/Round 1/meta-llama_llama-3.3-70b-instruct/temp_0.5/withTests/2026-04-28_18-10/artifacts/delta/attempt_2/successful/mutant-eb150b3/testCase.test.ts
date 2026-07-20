import Delta from '../../../../../../../../../../../subject_repositories/delta/src/Delta';

describe('compose', () => {
  it('should handle embed composition correctly', () => {
    Delta.registerEmbed('embed', {
      compose: (a, b, keepNull) => {
        if (keepNull) return a;
        return b;
      },
      invert: (a, b) => a,
      transform: (a, b, priority) => b,
    });

    const a = new Delta().insert({ embed: 1 });
    const b = new Delta().retain({ embed: 2 });
    const expected = new Delta().insert({ embed: 2 });
    expect(a.compose(b)).toEqual(expected);
  });
});