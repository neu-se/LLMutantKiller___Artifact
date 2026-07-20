import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe('Delta', () => {
  it('should throw an error when composing with non-object retain value', () => {
    Delta.registerEmbed('test', {
      compose: (_a: any, b: any) => b,
      invert: (_a: any, b: any) => b,
      transform: (_a: any, b: any) => b
    });

    const delta1 = new Delta().retain({ test: 'value1' });
    const delta2 = new Delta().retain('string' as any);

    expect(() => {
      delta1.compose(delta2);
    }).toThrow('cannot retain a string');
  });
});