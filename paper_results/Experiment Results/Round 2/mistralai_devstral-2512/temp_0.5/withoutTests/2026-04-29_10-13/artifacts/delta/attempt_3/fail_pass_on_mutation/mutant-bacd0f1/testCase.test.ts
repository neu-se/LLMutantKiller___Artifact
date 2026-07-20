import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe('Delta transform', () => {
  it('should correctly handle null embed data in transform', () => {
    Delta.registerEmbed('test', {
      compose: (a, b) => b,
      invert: (a, b) => a,
      transform: (a, b) => b,
    });

    const delta1 = new Delta().retain({ test: 'data' });
    const delta2 = new Delta().retain({ test: null });

    const result = delta1.transform(delta2, true);
    const expected = new Delta().retain({ test: null });

    expect(result.ops).toEqual(expected.ops);
  });
});