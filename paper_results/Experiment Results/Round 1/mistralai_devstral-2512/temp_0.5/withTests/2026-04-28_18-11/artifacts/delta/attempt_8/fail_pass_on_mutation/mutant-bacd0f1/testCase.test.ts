import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe('transform() with embeds', () => {
  it('transforms embed retain with object data and null correctly', () => {
    Delta.registerEmbed('test', {
      compose: (_a: any, b: any) => b,
      transform: (_a: any, b: any, priority: boolean) => priority ? b : { value: 1 },
      invert: (_a: any, b: any) => b,
    });

    const a = new Delta().retain({ test: { value: 1 } });
    const b = new Delta().retain({ test: null });
    const result = a.transform(b, false);
    const expected = new Delta().retain({ test: { value: 1 } });

    expect(result).toEqual(expected);
    Delta.unregisterEmbed('test');
  });
});