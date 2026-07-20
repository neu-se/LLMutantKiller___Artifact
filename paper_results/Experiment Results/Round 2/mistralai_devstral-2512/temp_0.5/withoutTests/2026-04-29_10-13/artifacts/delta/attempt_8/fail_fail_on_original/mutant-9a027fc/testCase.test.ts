import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe('Delta transform with embeds', () => {
  it('should correctly transform when thisData is object and otherData is number with priority true', () => {
    // Register a simple embed handler for testing
    Delta.registerEmbed('test', {
      compose: (_a: any, b: any) => b,
      invert: (_a: any, b: any) => b,
      transform: (a: any, b: any, priority: boolean) => priority ? a : b
    });

    const base = new Delta();
    base.insert({ test: 'A' });

    const delta1 = new Delta();
    delta1.retain({ test: 'B' });

    const delta2 = new Delta();
    delta2.retain(5);

    const result = delta1.transform(delta2, true);
    const expected = new Delta();
    expected.retain({ test: 'B' });

    expect(result.ops).toEqual(expected.ops);
  });
});