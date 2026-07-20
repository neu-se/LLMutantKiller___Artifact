import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe('transform() with embeds', () => {
  it('should handle case where thisData is object and otherData is not object', () => {
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
    const b = new Delta().retain(5);
    const expected = new Delta().retain(5).retain({ test: 'a' });

    const result = a.transform(b, true);
    expect(result.ops).toHaveLength(2);
    expect(result.ops[0]).toEqual({ retain: 5 });
    expect(result.ops[1]).toEqual({ retain: { test: 'a' } });

    Delta.unregisterEmbed('test');
  });
});