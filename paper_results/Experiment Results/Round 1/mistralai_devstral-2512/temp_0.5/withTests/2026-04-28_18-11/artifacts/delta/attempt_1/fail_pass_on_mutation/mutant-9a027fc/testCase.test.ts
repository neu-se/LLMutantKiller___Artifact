import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";
import Op from "../../../../../../../../../../../subject_repositories/delta/src/Op";

describe('transform() with embeds', () => {
  it('should transform retain with embed data correctly', () => {
    Delta.registerEmbed<{ value: number }>('test', {
      compose: (a, b) => ({ value: a.value + b.value }),
      transform: (a, b, priority) => {
        if (priority) {
          return { value: b.value };
        } else {
          return { value: a.value };
        }
      },
      invert: (a, b) => ({ value: b.value - a.value }),
    });

    const a = new Delta().retain({ test: { value: 5 } });
    const b = new Delta().retain({ test: { value: 3 } });
    const result = a.transform(b, true);
    const expected = new Delta().retain({ test: { value: 3 } });

    Delta.unregisterEmbed('test');

    expect(result).toEqual(expected);
  });
});