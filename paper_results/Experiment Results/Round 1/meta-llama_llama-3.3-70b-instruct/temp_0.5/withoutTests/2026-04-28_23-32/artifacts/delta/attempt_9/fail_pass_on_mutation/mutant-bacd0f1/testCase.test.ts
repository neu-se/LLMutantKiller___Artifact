import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe('Delta', () => {
  it('transform should handle null otherData correctly', () => {
    const delta1 = new Delta([{ retain: { foo: 'bar' } }]);
    Delta.registerEmbed('foo', {
      compose: (a, b, keepNull) => a,
      invert: (a, b) => a,
      transform: (a, b, priority) => priority ? b : a,
    });
    const delta2 = new Delta([{ retain: { foo: undefined } }]);
    const transformedDelta = delta1.transform(delta2);
    expect(transformedDelta.ops[0].retain).toEqual({ foo: 'bar' });
  });
});