import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe('Delta', () => {
  it('should throw an error when composing with null embed', () => {
    Delta.registerEmbed('embed', {
      compose: (a: unknown, b: unknown) => b,
      invert: (a: unknown, b: unknown) => b,
      transform: (a: unknown, b: unknown, priority: boolean) => b
    });
    const delta1 = new Delta([{ insert: { embed: 'test' } }]);
    const delta2 = new Delta([{ retain: { embed: null } }]);
    expect(() => {
      delta1.compose(delta2);
    }).toThrow('cannot retain a object');
  });
});