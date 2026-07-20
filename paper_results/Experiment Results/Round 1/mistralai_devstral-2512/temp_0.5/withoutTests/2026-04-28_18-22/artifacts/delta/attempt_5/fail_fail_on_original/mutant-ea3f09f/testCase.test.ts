import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe('Delta transform with embeds', () => {
  it('should handle transform when one operation has object retain and other has insert', () => {
    Delta.registerEmbed('test', {
      compose: (a: unknown, b: unknown) => b,
      invert: (a: unknown, b: unknown) => a,
      transform: (a: unknown, b: unknown) => b
    });

    const delta1 = new Delta().retain({ test: 'value1' });
    const delta2 = new Delta().insert('text');

    const result = delta1.transform(delta2, true);
    const expected = new Delta().retain({ test: 'value1' }).insert('text');

    expect(result.ops).toEqual(expected.ops);
  });
});