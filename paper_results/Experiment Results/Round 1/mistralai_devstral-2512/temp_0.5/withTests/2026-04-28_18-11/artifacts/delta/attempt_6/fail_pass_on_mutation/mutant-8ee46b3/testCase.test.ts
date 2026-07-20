import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";
import Op from "../../../../../../../../../../../subject_repositories/delta/src/Op";

describe('transform() with embeds', () => {
  it('transforms embed retain with null data', () => {
    Delta.registerEmbed<null>('null', {
      compose: (a, b, keepNull) => (keepNull ? a : b),
      transform: (a, b, priority) => (priority ? a : b),
      invert: (a, b) => b,
    });

    const a = new Delta().retain({ null: null });
    const b = new Delta().retain({ null: null });
    const expected = new Delta().retain({ null: null });
    const result = a.transform(b, false);
    expect(result).toEqual(expected);

    Delta.unregisterEmbed('null');
  });
});