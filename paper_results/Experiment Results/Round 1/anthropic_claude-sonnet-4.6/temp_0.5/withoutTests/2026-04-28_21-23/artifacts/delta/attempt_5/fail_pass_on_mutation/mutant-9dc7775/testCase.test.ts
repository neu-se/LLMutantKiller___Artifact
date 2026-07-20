import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe('Delta transform', () => {
  it('should handle embed transform correctly when thisData is an object retain', () => {
    let transformCallArgs: [unknown, unknown, boolean] | null = null;
    Delta.registerEmbed('block', {
      compose: (a: unknown, b: unknown, _: boolean) => b,
      invert: (a: unknown, b: unknown) => a,
      transform: (a: unknown, b: unknown, priority: boolean) => {
        transformCallArgs = [a, b, priority];
        return priority ? a : b;
      },
    });

    const a = new Delta().retain({ block: { id: 'a' } });
    const b = new Delta().retain({ block: { id: 'b' } });

    const result = a.transform(b, true);

    expect(transformCallArgs).not.toBeNull();
    expect(transformCallArgs![0]).toEqual({ id: 'a' });
    expect(transformCallArgs![1]).toEqual({ id: 'b' });
    expect(transformCallArgs![2]).toBe(true);
    expect(result.ops).toEqual([{ retain: { block: { id: 'a' } } }]);

    Delta.unregisterEmbed('block');
  });
});