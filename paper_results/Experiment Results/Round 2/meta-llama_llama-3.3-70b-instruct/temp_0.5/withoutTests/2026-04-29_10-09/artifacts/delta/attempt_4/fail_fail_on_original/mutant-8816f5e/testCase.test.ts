import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe('Delta', () => {
  it('should correctly transform embeds', () => {
    const delta1 = new Delta();
    delta1.retain({ embed: 'data1' });

    const delta2 = new Delta();
    delta2.retain({ otherEmbed: 'data2' });

    Delta.registerEmbed('embed', {
      compose: (a: any, b: any, keepNull: boolean) => a,
      invert: (a: any, b: any) => a,
      transform: (a: any, b: any, priority: boolean) => priority? b : a,
    });

    const transformedDelta = delta1.transform(delta2, true);
    expect(transformedDelta.ops[0].retain).toEqual({ embed: 'data1' });
  });
});