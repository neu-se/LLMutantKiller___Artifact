import Delta from '../../../../../../../../../../../subject_repositories/delta/src/Delta';

describe('Delta', () => {
  it('compose with retain and embed', () => {
    Delta.registerEmbed('embed', {
      compose: (a, b, keepNull) => a,
      invert: (a, b) => a,
      transform: (a, b, priority) => a,
    });
    const a = new Delta().retain({ embed: 1 });
    const b = new Delta().insert({ embed: 1 });
    const expected = new Delta().insert({ embed: 1 });
    expect(a.compose(b)).toEqual(expected);
    Delta.unregisterEmbed('embed');
  });
});