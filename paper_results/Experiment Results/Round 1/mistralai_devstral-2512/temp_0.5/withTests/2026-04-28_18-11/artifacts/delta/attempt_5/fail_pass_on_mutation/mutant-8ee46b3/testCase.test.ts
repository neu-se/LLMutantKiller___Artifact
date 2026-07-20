import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";
import Op from "../../../../../../../../../../../subject_repositories/delta/src/Op";

describe('transform() with embeds', () => {
  it('transforms embed retain with object data', () => {
    Delta.registerEmbed<{ value: number }>('object', {
      compose: (a, b, keepNull) => (keepNull ? a : b),
      transform: (a, b, priority) => (priority ? a : b),
      invert: (a, b) => b,
    });

    const a = new Delta().retain({ object: { value: 1 } });
    const b = new Delta().retain({ object: { value: 2 } });
    const expected = new Delta().retain({ object: { value: 2 } });
    const result = a.transform(b, false);
    expect(result).toEqual(expected);

    Delta.unregisterEmbed('object');
  });
});