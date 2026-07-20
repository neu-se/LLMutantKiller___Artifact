import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";
import Op from "../../../../../../../../../../../subject_repositories/delta/src/Op";

describe('transform() with embeds', () => {
  it('should handle retain with non-object embed data correctly', () => {
    Delta.registerEmbed<number>('test', {
      compose: (a, b) => a + b,
      transform: (a, b, priority) => {
        if (priority) {
          return b;
        } else {
          return a;
        }
      },
      invert: (a, b) => b - a,
    });

    const a = new Delta().retain({ test: 5 });
    const b = new Delta().retain(3);
    const result = a.transform(b, true);
    const expected = new Delta().retain(3);

    Delta.unregisterEmbed('test');

    expect(result).toEqual(expected);
  });
});