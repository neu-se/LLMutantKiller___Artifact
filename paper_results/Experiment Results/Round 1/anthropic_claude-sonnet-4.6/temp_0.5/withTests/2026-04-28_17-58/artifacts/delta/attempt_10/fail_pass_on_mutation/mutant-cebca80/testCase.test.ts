import Delta from "../../../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe('invert() mutation detection', () => {
  it('advances baseIndex correctly after delete when followed by embed retain', () => {
    Delta.registerEmbed<string>('img', {
      compose: (a, b) => b,
      invert: (a, b) => b,
      transform: (a, b, _priority) => b,
    });

    try {
      // delete(1) should advance baseIndex by 1
      // then retain({img:'new'}) should look at base position 1 (the embed)
      // In mutated code, return baseIndex + length is missing from delete branch
      // so baseIndex stays 0, and embed handler looks at wrong position
      const delta = new Delta()
        .delete(1)
        .retain({ img: 'new' });
      const base = new Delta()
        .insert('x')
        .insert({ img: 'old' });

      const expected = new Delta()
        .insert('x')
        .retain({ img: 'old' });

      const inverted = delta.invert(base);
      expect(inverted).toEqual(expected);
      expect(base.compose(delta).compose(inverted)).toEqual(base);
    } finally {
      Delta.unregisterEmbed('img');
    }
  });
});