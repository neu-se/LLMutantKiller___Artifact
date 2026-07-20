import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe('Delta transform with embeds', () => {
  it('should correctly handle transform when thisData is object and otherData is number', () => {
    Delta.registerEmbed('test', {
      compose: (_a: any, b: any) => b,
      invert: (_a: any, b: any) => b,
      transform: (a: any, _b: any, priority: boolean) => priority ? a : { test: 'transformed' },
    });

    const thisDelta = new Delta().retain({ test: 'A' });
    const otherDelta = new Delta().retain(5);

    const result = thisDelta.transform(otherDelta, false);
    const expected = new Delta().retain({ test: 'transformed' });

    expect(result.ops).toEqual(expected.ops);
  });
});