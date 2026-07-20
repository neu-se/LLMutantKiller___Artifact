import Delta from "../../../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe('invert() mutation detection', () => {
  it('inverts embed retain after numeric retain with correct baseIndex', () => {
    Delta.registerEmbed<{ val: string }>('custom', {
      compose: (a, b) => b,
      invert: (a, b) => b,
      transform: (a, b) => b,
    });

    try {
      // retain(1) advances baseIndex by 1, then embed retain needs correct baseIndex=1
      const delta = new Delta()
        .retain(1, { bold: true })
        .retain({ custom: { val: 'new' } });
      const base = new Delta()
        .insert('x')
        .insert({ custom: { val: 'old' } });

      const inverted = delta.invert(base);

      // retain(1,{bold:true}) -> retain(1,{bold:null})
      // retain({custom:{val:'new'}}) -> retain({custom:{val:'old'}})
      const expected = new Delta()
        .retain(1, { bold: null })
        .retain({ custom: { val: 'old' } });

      expect(inverted).toEqual(expected);
      expect(base.compose(delta).compose(inverted)).toEqual(base);
    } finally {
      Delta.unregisterEmbed('custom');
    }
  });
});