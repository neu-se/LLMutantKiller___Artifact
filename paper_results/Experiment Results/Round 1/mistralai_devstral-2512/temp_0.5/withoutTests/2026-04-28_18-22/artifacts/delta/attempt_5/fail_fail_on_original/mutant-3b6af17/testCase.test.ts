import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe('Delta transform with embeds', () => {
  it('should correctly transform when thisData is not an object', () => {
    // Register a simple embed handler for testing
    Delta.registerEmbed('test', {
      compose: (a: any, b: any) => b,
      invert: (a: any, b: any) => b,
      transform: (a: any, b: any, priority: boolean) => priority ? b : a
    });

    const delta1 = new Delta().retain(5);
    const delta2 = new Delta().retain({ test: 'value' });

    const result = delta1.transform(delta2, false);
    const expected = new Delta().retain(5);

    expect(result.ops).toEqual(expected.ops);
  });
});