import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe('Delta transform with embeds', () => {
  it('should correctly transform when both operations have object retains with same embed type', () => {
    Delta.registerEmbed('test', {
      compose: (a: unknown, b: unknown) => b,
      invert: (a: unknown, b: unknown) => a,
      transform: (a: unknown, b: unknown, priority: boolean) => priority ? b : a
    });

    const delta1 = new Delta().retain({ test: 'value1' });
    const delta2 = new Delta().retain({ test: 'value2' });

    const result = delta1.transform(delta2, false);
    const expected = new Delta().retain({ test: 'value1' });

    expect(result.ops).toEqual(expected.ops);
  });
});