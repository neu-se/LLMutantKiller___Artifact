import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe('Delta', () => {
  it('should transform correctly when retain data is an object', () => {
    Delta.registerEmbed('test', {
      compose: (a, b, keepNull) => a,
      invert: (a, b) => a,
      transform: (a, b, priority) => {
        if (typeof a === 'object' && typeof b === 'object' && Object.keys(a).length > 0 && Object.keys(b).length > 0) {
          return { ...a, ...b };
        }
        throw new Error('Both objects should have keys');
      },
    });
    const delta1 = new Delta();
    delta1.retain({ test: { foo: 'data' } }, {});
    const delta2 = new Delta();
    delta2.retain({ test: { bar: 'new data' } }, {});
    expect(() => delta1.transform(delta2)).toThrowError('Both objects should have keys');
    Delta.unregisterEmbed('test');
  });
});