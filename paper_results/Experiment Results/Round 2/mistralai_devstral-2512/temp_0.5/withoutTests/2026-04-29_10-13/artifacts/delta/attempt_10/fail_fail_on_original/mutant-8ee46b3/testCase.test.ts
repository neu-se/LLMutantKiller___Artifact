import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe('Delta transform with embeds', () => {
  it('should correctly transform when otherData is not an object', () => {
    Delta.registerEmbed('test', {
      compose: (a: unknown, b: unknown) => b,
      invert: (a: unknown, b: unknown) => b,
      transform: (a: unknown, b: unknown, priority: boolean) => priority ? b : a
    });

    const delta1 = new Delta().retain({ test: 'A' });
    const delta2 = new Delta().retain(5);

    const result = delta1.transform(delta2, true);
    const expected = new Delta().retain(5);

    expect(result.ops).toEqual(expected.ops);
  });
});