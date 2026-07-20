import Delta from '../../../../../../../../../../../subject_repositories/delta/src/Delta';

describe('Delta', () => {
  it('should compose correctly', () => {
    Delta.registerEmbed('embed', {
      compose: (a, b, keepNull) => ({ embed: a.embed + b.embed }),
      invert: (a, b) => ({ embed: a.embed - b.embed }),
      transform: (a, b, priority) => priority? a : b,
    });
    const a = new Delta().insert({ embed: 1 });
    const b = new Delta().retain({ embed: 2 });
    const expected = new Delta().insert({ embed: 3 });
    expect(a.compose(b)).toEqual(expected);
  });
});