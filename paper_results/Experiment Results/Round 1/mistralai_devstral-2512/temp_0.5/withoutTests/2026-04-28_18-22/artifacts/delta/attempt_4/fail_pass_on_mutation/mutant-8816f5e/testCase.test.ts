import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe('Delta transform with embeds', () => {
  it('should correctly transform when both operands have embed objects', () => {
    Delta.registerEmbed('test', {
      compose: (_a: any, b: any) => b,
      invert: (_a: any, b: any) => b,
      transform: (a: any, _b: any, priority: boolean) => priority ? a : { test: 'transformed' },
    });

    const thisDelta = new Delta().retain({ test: 'A' });
    const otherDelta = new Delta().retain({ test: 'B' });

    const result = thisDelta.transform(otherDelta, true);
    const expected = new Delta().retain({ test: 'A' });

    expect(result.ops).toEqual(expected.ops);
  });
});