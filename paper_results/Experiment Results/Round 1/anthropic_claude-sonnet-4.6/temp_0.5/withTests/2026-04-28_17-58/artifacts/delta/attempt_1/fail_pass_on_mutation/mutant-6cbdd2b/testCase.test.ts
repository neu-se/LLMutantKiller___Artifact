import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta.ts";
import Op from "../../../../../../../../../../../subject_repositories/delta/src/Op.ts";

describe('compose() retain start optimization with embed retain', () => {
  it('should not apply retain start optimization when other starts with an object retain', () => {
    // Register a handler for the embed type
    Delta.registerEmbed<Op[]>('delta', {
      compose: (a, b) => new Delta(a as Op[]).compose(new Delta(b as Op[])).ops,
      transform: (a, b, priority) =>
        new Delta(a as Op[]).transform(new Delta(b as Op[]), priority).ops,
      invert: (a, b) => new Delta(a as Op[]).invert(new Delta(b as Op[])).ops,
    });

    // `a` has an insert followed by an embed retain
    // `b` starts with an object (embed) retain - this should NOT trigger the retain start optimization
    const a = new Delta().insert({ delta: [{ insert: 'a' }] });
    const b = new Delta().retain({ delta: [{ insert: 'b' }] });

    // Expected: compose the embed with the embed retain
    const expected = new Delta().insert({ delta: [{ insert: 'ba' }] });

    const result = a.compose(b);

    Delta.unregisterEmbed('delta');

    expect(result).toEqual(expected);
  });
});