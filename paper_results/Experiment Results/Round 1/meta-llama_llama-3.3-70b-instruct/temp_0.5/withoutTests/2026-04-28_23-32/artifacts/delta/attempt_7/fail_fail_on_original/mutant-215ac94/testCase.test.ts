import Delta from '../../../../../../../../../../../subject_repositories/delta/src/Delta';

describe('Delta', () => {
  it('should correctly transform data when retain types match', () => {
    const delta1 = new Delta();
    delta1.retain({ foo: 'bar', baz: 'qux' });
    const delta2 = new Delta();
    delta2.retain({ foo: 'baz', qux: 'quux' });
    Delta.registerEmbed('foo', {
      compose: (a, b, keepNull) => {
        if (typeof a === 'object' && typeof b === 'object') {
          return { ...a, ...b };
        }
        return a;
      },
      invert: (a, b) => a,
      transform: (a, b, priority) => {
        if (typeof a === 'object' && typeof b === 'object') {
          return { ...a, ...b };
        }
        return priority ? b : a;
      },
    });
    const transformedDelta = delta1.transform(delta2, true);
    expect(transformedDelta.ops[0].retain).toEqual({ foo: 'baz', baz: 'qux', qux: 'quux' });
  });
});