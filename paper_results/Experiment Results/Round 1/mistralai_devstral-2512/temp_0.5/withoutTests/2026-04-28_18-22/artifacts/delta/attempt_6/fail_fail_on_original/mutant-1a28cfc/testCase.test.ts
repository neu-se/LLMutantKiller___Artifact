import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe('Delta', () => {
  it('should throw an error when composing with null embed', () => {
    const delta1 = new Delta([{ insert: { type: 'embed', data: 'test' } }]);
    const delta2 = new Delta([{ retain: { type: 'embed', data: null } }]);
    Delta.registerEmbed('embed', {
      compose: (a, b) => b,
      invert: (a, b) => b,
      transform: (a, b) => b
    });
    expect(() => {
      delta1.compose(delta2);
    }).toThrow('cannot retain a object');
  });
});