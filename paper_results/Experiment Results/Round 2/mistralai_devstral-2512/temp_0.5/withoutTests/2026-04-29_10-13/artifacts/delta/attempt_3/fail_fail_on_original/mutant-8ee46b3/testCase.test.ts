import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe('Delta transform with embeds', () => {
  it('should correctly transform when otherData is a number and thisData is an embed', () => {
    Delta.registerEmbed('test', {
      compose: (a: any, b: any) => b,
      invert: (a: any, b: any) => b,
      transform: (a: any, b: any) => b
    });

    const delta1 = new Delta().retain({ test: 'A' });
    const delta2 = new Delta().retain(5);

    const result = delta1.transform(delta2, true);
    const expected = new Delta().retain(5);

    expect(result.ops).toEqual(expected.ops);
  });
});