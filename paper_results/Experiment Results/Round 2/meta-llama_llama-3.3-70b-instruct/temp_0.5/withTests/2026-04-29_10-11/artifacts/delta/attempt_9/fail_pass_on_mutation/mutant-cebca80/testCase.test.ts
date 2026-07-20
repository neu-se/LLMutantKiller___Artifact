import Delta from '../../../../../../../../../../../subject_repositories/delta/src/Delta';

describe('invert()', () => {
  it('should correctly invert a delta with a retain operation and an object value', () => {
    Delta.registerEmbed('embed', {
      compose: (a, b) => a,
      transform: (a, b, priority) => a,
      invert: (a, b) => a,
    });
    const delta = new Delta().retain({ embed: 1 });
    const base = new Delta().insert({ embed: 1 });
    const expected = new Delta().retain({ embed: 1 });
    const inverted = delta.invert(base);
    expect(inverted).toEqual(expected);
    Delta.unregisterEmbed('embed');
  });
});