import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe('Delta transform with embeds', () => {
  it('should correctly transform when otherData is a number and priority is false', () => {
    // Register a simple embed handler for testing
    Delta.registerEmbed('test', {
      compose: (_a: any, b: any) => b,
      invert: (_a: any, b: any) => b,
      transform: (_a: any, b: any, _priority: boolean) => b
    });

    const base = new Delta();
    base.insert({ test: 'A' });

    const delta1 = new Delta();
    delta1.retain({ test: 'B' });

    const delta2 = new Delta();
    delta2.retain(5);

    const result = delta1.transform(delta2, false);
    const expected = new Delta();
    expected.retain(5);

    expect(result.ops).toEqual(expected.ops);
  });
});