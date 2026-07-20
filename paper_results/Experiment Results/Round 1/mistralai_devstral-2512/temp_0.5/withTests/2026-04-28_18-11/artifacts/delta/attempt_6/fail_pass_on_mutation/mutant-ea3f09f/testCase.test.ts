import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe('transform() with embeds', () => {
  it('should correctly transform when both operations have embed retains', () => {
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
    const b = new Delta().retain({ test: 'b' });
    const expected = new Delta().retain({ test: 'ba' });

    const result = a.transform(b, true);
    expect(result).toEqual(expected);

    Delta.unregisterEmbed('test');
  });
});