import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe('Delta transform', () => {
  it('should correctly transform when otherData is null object', () => {
    Delta.registerEmbed('test', {
      compose: (a, b) => b,
      invert: (a, b) => a,
      transform: (a, b) => b,
    });

    const delta1 = new Delta().retain({ test: 'data' });
    const delta2 = new Delta().retain({ test: null });

    const result = delta1.transform(delta2, false);
    const expected = new Delta().retain(1);

    expect(result.ops).toEqual(expected.ops);
  });
});