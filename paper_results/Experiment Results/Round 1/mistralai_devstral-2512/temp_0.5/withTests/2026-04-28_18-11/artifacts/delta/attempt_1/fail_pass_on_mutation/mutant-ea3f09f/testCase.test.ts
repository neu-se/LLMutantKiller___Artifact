import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";
import Op from "../../../../../../../../../../../subject_repositories/delta/src/Op";

describe('transform() with embeds', () => {
  it('should transform embed retain operations correctly', () => {
    Delta.registerEmbed<{ value: string }>('test', {
      compose: (a, b) => ({ value: a.value + b.value }),
      transform: (a, b, priority) => {
        if (priority) {
          return { value: b.value + a.value };
        } else {
          return { value: a.value + b.value };
        }
      },
      invert: (a, b) => ({ value: b.value }),
    });

    const a = new Delta().retain({ test: { value: 'a' } });
    const b = new Delta().retain({ test: { value: 'b' } });
    const expected = new Delta().retain({ test: { value: 'ba' } });

    const result = a.transform(b, true);
    expect(result).toEqual(expected);

    Delta.unregisterEmbed('test');
  });
});