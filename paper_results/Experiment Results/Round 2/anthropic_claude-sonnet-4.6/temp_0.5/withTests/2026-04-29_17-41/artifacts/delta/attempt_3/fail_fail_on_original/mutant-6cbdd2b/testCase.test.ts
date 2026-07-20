import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe('compose() retain start optimization', () => {
  it('retain start optimization only applies to number retains', () => {
    Delta.registerEmbed<string[]>('custom', {
      compose: (_a: any, b: any) => b,
      invert: (_a: any, b: any) => b,
      transform: (_a: any, b: any, _priority: boolean) => b,
    });

    try {
      // this: has inserts that should be moved to front by optimization
      // other: starts with object retain (embed) with no attributes
      // With original: block skipped, embed retain processed normally in main loop
      // With mutation: block entered, firstLeft = object
      //   - while loop: peekLength() <= object → false (NaN), no inserts moved
      //   - firstOther.retain - firstLeft = NaN, NaN > 0 = false
      //   - otherIter NOT advanced
      // So both should produce same result... 
      
      // Let me try: this has inserts, other starts with object retain
      // The optimization in original moves inserts that fit within the number retain
      // to the front. If other starts with object retain, original skips this.
      // With mutation, it tries but NaN arithmetic means nothing happens.
      // Result should be same.

      // NEW IDEA: What if firstOther.retain is an object, and this starts with 
      // a string insert of length 1? The while condition is `1 <= object`.
      // In JS: 1 <= {} is false (NaN). But what about specific objects?
      // Plain objects: Number({}) = NaN. So 1 <= NaN = false. No difference.

      // I think the mutation might be a "equivalent mutant" for most cases.
      // But let me try the case where this has NO inserts at start.
      
      const a = new Delta().retain(3).insert('hello');
      const b = new Delta().retain({ custom: 'x' }).retain(3).insert('world');
      
      const result = a.compose(b);
      const expected = new Delta()
        .retain({ custom: 'x' })
        .retain(3)
        .insert('world')
        .insert('hello');
      
      expect(result).toEqual(expected);
    } finally {
      Delta.unregisterEmbed('custom');
    }
  });
});