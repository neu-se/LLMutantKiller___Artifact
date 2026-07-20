import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta.ts";

describe('Delta transform', () => {
  it('should handle null embed data correctly in transform', () => {
    Delta.registerEmbed('test', {
      compose: (a, b) => b,
      invert: (a, b) => a,
      transform: (a, b) => b,
    });

    const delta1 = new Delta().retain({ test: 'data' });
    const delta2 = new Delta().retain({ test: null });

    const result = delta1.transform(delta2, true);
    const expected = new Delta().retain(1);

    expect(result.ops).toEqual(expected.ops);
  });
});