import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe('Delta transform with embeds', () => {
  it('should correctly transform when thisData is object and otherData is number', () => {
    Delta.registerEmbed('test', {
      compose: (a: any, b: any) => b,
      invert: (a: any, b: any) => b,
      transform: (a: any, b: any, priority: boolean) => priority ? a : b,
    });

    const thisDelta = new Delta().retain({ test: 'B' });
    const otherDelta = new Delta().retain(5);

    const result = thisDelta.transform(otherDelta, true);
    const expected = new Delta().retain(5);

    expect(result.ops).toEqual(expected.ops);
  });
});