import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe('Delta transform with embeds', () => {
  it('should correctly transform when both operations have object retains with different embed types', () => {
    Delta.registerEmbed('test1', {
      compose: (a: unknown, b: unknown) => b,
      invert: (a: unknown, b: unknown) => a,
      transform: (a: unknown, b: unknown) => b
    });

    Delta.registerEmbed('test2', {
      compose: (a: unknown, b: unknown) => b,
      invert: (a: unknown, b: unknown) => a,
      transform: (a: unknown, b: unknown) => b
    });

    const delta1 = new Delta().retain({ test1: 'value1' });
    const delta2 = new Delta().retain({ test2: 'value2' });

    expect(() => {
      delta1.transform(delta2, true);
    }).toThrow('embed types not matched');
  });
});