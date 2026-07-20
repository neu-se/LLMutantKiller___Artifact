import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe('transform()', () => {
  it('transform retain embed against retain embed with same type uses handler transform result', () => {
    // Register a handler where transform returns null to expose the mutation
    Delta.registerEmbed('x', {
      compose: (a: unknown, b: unknown) => b,
      transform: (_a: unknown, _b: unknown, _priority: boolean) => null,
      invert: (a: unknown, _b: unknown) => a,
    });

    const a = new Delta().retain({ x: 'a' });
    const b = new Delta().retain({ x: 'b' });

    // In transform else branch:
    // thisData = { x: 'a' }, otherData = { x: 'b' }
    // Original condition: typeof { x:'b' } === 'object' && { x:'b' } !== null = true
    //   => transformedData = { x: 'b' }
    // Then embed handler branch: both are non-null objects with same key 'x'
    //   handler.transform('a', 'b', false) = null
    //   transformedData = { x: null }
    // delta.retain({ x: null })
    const result = a.transform(b, false);
    expect(result).toEqual(new Delta().retain({ x: null }));

    Delta.unregisterEmbed('x');
  });
});