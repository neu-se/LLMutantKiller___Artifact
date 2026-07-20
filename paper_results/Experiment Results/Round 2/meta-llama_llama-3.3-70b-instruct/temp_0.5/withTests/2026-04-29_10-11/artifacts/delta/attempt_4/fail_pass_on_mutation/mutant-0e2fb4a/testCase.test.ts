import Delta from '../../../../../../../../../../../subject_repositories/delta/src/Delta';

describe('Delta', () => {
  it('should correctly invert a Delta with a retain operation on an object and null', () => {
    Delta.registerEmbed('embed', {
      compose: (a, b) => a,
      transform: (a, b, priority) => a,
      invert: (a, b) => a,
    });
    const delta = new Delta().retain({ embed: 1 }, null);
    const base = new Delta().insert({ embed: 1 });
    const expected = new Delta().retain({ embed: 1 }, {});
    const inverted = delta.invert(base);
    expect(inverted).toEqual(expected);
  });
});