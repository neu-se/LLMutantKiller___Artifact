import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta.ts";

describe('Delta transform with embeds', () => {
  it('should correctly transform embeds when both thisData and otherData are objects', () => {
    // Register a simple embed handler for testing
    Delta.registerEmbed('test', {
      compose: (a, b) => b,
      invert: (a, b) => b,
      transform: (a, b, priority) => priority ? a : b,
    });

    const base = new Delta().insert({ test: 'A' });
    const thisDelta = new Delta().retain({ test: 'B' });
    const otherDelta = new Delta().retain({ test: 'C' });

    const result = thisDelta.transform(otherDelta, true);
    const expected = new Delta().retain({ test: 'B' });

    expect(result.ops).toEqual(expected.ops);
  });
});