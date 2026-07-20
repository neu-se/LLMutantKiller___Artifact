import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe('Delta transform', () => {
  it('should correctly handle null vs object embed data in transform', () => {
    Delta.registerEmbed('test', {
      compose: (a: unknown, b: unknown) => b,
      invert: (a: unknown, b: unknown) => a,
      transform: (a: unknown, b: unknown) => b,
    });

    const delta1 = new Delta().retain({ test: null });
    const delta2 = new Delta().retain({ test: { value: 1 } });

    const result = delta1.transform(delta2, false);
    const expected = new Delta().retain({ test: { value: 1 } });

    expect(result.ops).toEqual(expected.ops);
  });
});