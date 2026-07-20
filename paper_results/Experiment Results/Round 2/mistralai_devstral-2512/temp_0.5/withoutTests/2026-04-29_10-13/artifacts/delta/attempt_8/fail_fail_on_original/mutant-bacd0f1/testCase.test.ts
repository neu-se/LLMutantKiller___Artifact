import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe('Delta transform', () => {
  it('should correctly transform when otherData is null with priority true', () => {
    Delta.registerEmbed('test', {
      compose: (a: unknown, b: unknown) => b,
      invert: (a: unknown, b: unknown) => a,
      transform: (a: unknown, b: unknown) => b,
    });

    const delta1 = new Delta().retain({ test: { value: 1 } });
    const delta2 = new Delta().retain({ test: null });

    const result = delta1.transform(delta2, true);
    const expected = new Delta().retain(1);

    expect(result.ops).toEqual(expected.ops);
  });
});