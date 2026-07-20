import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe('Delta', () => {
  it('should throw an error when composing with null embed', () => {
    Delta.registerEmbed('embed', {
      compose: (_a: unknown, b: unknown) => b,
      invert: (_a: unknown, b: unknown) => b,
      transform: (_a: unknown, b: unknown, _priority: boolean) => b
    });
    const delta1 = new Delta([{ insert: { embed: 'test' } }]);
    const delta2 = new Delta([{ retain: { embed: null } }]);
    expect(() => {
      delta1.compose(delta2);
    }).toThrow('cannot retain a object');
  });
});