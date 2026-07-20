import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe('Delta', () => {
  it('should transform correctly when retain data is an object', () => {
    Delta.registerEmbed('test', {
      compose: (a, b, keepNull) => a,
      invert: (a, b) => a,
      transform: (a, b, priority) => {
        if (typeof a === 'object' && typeof b === 'object') {
          return { ...a, ...b };
        }
        return b;
      },
    });
    const delta1 = new Delta();
    delta1.retain({ test: { foo: 'data' } }, {});
    const delta2 = new Delta();
    delta2.retain({ test: { bar: 'new data' } }, {});
    const transformed = delta1.transform(delta2);
    expect(transformed.ops[0].retain).toEqual({ test: { foo: 'data', bar: 'new data' } });
    Delta.unregisterEmbed('test');
  });
});