import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe('transform() with embeds', () => {
  it('should handle object embed data vs number when priority is false', () => {
    Delta.registerEmbed('test', {
      compose: (a, b) => b,
      transform: (a, b, priority) => priority ? b : a,
      invert: (a, b) => b,
    });

    const a = new Delta().retain({ test: { value: 1 } });
    const b = new Delta().retain(5);
    const result = a.transform(b, false);
    const expected = new Delta().retain({ test: { value: 1 } });
    expect(result).toEqual(expected);

    Delta.unregisterEmbed('test');
  });
});