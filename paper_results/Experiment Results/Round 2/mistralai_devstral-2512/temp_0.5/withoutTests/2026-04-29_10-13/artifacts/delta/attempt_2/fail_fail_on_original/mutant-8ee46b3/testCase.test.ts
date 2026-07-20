import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta.ts";

describe('Delta transform with embeds', () => {
  it('should correctly handle transform when otherData is not an object', () => {
    // Register a simple embed handler for testing
    Delta.registerEmbed('test', {
      compose: (a, b) => b,
      invert: (a, b) => b,
      transform: (a, b) => b
    });

    const delta1 = new Delta().retain({ test: 'A' });
    const delta2 = new Delta().retain(5); // Using number instead of embed

    const result = delta1.transform(delta2, true);
    const expected = new Delta().retain(5);

    expect(result.ops).toEqual(expected.ops);
  });
});