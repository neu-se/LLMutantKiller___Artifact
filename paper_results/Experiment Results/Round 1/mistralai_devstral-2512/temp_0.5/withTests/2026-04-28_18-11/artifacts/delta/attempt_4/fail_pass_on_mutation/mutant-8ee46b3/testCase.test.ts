import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";
import Op from "../../../../../../../../../../../subject_repositories/delta/src/Op";

describe('transform() with embeds', () => {
  it('transforms embed retain with number data', () => {
    Delta.registerEmbed<number>('number', {
      compose: (a, b, keepNull) => (keepNull ? a : b),
      transform: (a, b, priority) => (priority ? a : b),
      invert: (a, b) => b,
    });

    const a = new Delta().retain({ number: 42 });
    const b = new Delta().retain({ number: 100 });
    const expected = new Delta().retain({ number: 100 });
    const result = a.transform(b, false);
    expect(result).toEqual(expected);

    Delta.unregisterEmbed('number');
  });
});