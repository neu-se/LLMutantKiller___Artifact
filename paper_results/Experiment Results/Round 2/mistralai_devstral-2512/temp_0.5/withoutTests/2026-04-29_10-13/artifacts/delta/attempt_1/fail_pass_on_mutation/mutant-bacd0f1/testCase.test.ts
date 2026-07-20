import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta.ts";

describe('Delta transform', () => {
  it('should correctly transform with null embed data', () => {
    // Register a simple embed handler for testing
    Delta.registerEmbed('test', {
      compose: (a, b) => b,
      invert: (a, b) => a,
      transform: (a, b) => b,
    });

    const delta1 = new Delta().retain({ test: null });
    const delta2 = new Delta().retain({ test: 'data' });

    const result = delta1.transform(delta2, true);
    const expected = new Delta().retain({ test: 'data' });

    expect(result.ops).toEqual(expected.ops);
  });
});