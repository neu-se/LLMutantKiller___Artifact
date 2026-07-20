import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta.ts";
import Op from "../../../../../../../../../../../subject_repositories/delta/src/Op.ts";

describe('compose() retain start optimization', () => {
  it('should correctly compose when other starts with an object retain without attributes', () => {
    Delta.registerEmbed<Op[]>('delta', {
      compose: (a, b) => new Delta(a as Op[]).compose(new Delta(b as Op[])).ops,
      transform: (a, b, priority) =>
        new Delta(a as Op[]).transform(new Delta(b as Op[]), priority).ops,
      invert: (a, b) => new Delta(a as Op[]).invert(new Delta(b as Op[])).ops,
    });

    // `a` starts with inserts before the embed
    // `b` starts with an object retain (no attributes) - mutation makes firstLeft = object
    // Original: skips optimization; Mutated: enters optimization with firstLeft = object
    const a = new Delta()
      .insert('Hello')
      .insert({ delta: [{ insert: 'a' }] });
    const b = new Delta()
      .retain({ delta: [{ insert: 'b' }] });

    // With original: no start optimization, processes normally
    // The 'Hello' insert in `a` is consumed by... wait, `b` only has one op (object retain of length 1)
    // So compose should: keep 'Hello' as-is (no corresponding op in b beyond length 1), 
    // and compose the embed
    const result = a.compose(b);

    Delta.unregisterEmbed('delta');

    // Expected result: Hello stays, embed gets composed
    const expected = new Delta()
      .insert('Hello')
      .insert({ delta: [{ insert: 'ba' }] });

    expect(result).toEqual(expected);
  });
});