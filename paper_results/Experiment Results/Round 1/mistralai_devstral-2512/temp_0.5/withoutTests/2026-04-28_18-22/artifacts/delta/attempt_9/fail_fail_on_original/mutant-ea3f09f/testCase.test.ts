import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe('Delta transform with embeds', () => {
  it('should correctly transform when one operation has object retain and other has number retain', () => {
    Delta.registerEmbed('test', {
      compose: (a: unknown, b: unknown) => b,
      invert: (a: unknown, b: unknown) => a,
      transform: (a: unknown, b: unknown, priority: boolean) => priority ? b : a
    });

    const delta1 = new Delta().retain({ test: 'value1' });
    const delta2 = new Delta().retain(5);

    const result = delta1.transform(delta2, true);
    const expected = new Delta().retain(5);

    expect(result.ops).toEqual(expected.ops);
  });
});