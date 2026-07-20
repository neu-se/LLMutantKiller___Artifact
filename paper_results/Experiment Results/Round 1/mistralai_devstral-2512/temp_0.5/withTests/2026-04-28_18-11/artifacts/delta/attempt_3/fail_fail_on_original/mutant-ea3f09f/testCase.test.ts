import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe('transform() with embeds', () => {
  it('should transform embed retain with number retain correctly', () => {
    Delta.registerEmbed<string>('test', {
      compose: (a, b) => a + b,
      transform: (a, b, priority) => {
        if (priority) {
          return b + a;
        } else {
          return a + b;
        }
      },
      invert: (a, b) => b,
    });

    const a = new Delta().retain({ test: 'a' });
    const b = new Delta().retain(1);
    const expected = new Delta().retain(1).retain({ test: 'a' });

    const result = a.transform(b, true);
    expect(result).toEqual(expected);

    Delta.unregisterEmbed('test');
  });
});