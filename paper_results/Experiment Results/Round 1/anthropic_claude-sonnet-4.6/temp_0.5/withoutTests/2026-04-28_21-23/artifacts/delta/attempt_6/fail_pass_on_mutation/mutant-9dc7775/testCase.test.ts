import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe('Delta transform', () => {
  it('should not throw when thisData is null and otherData is a non-null embed object', () => {
    Delta.registerEmbed('img', {
      compose: (a: unknown, b: unknown, _keepNull: boolean) => b,
      invert: (a: unknown, b: unknown) => a,
      transform: (a: unknown, b: unknown, _priority: boolean) => b,
    });

    const a = new Delta();
    // Force thisOp.retain to be null - treated as retain by peekType since typeof null === 'object'
    (a as any).ops = [{ retain: null }];
    const b = new Delta().retain({ img: { src: 'test.png' } });

    // Original: null check prevents entering block → no throw
    // Mutated: null check removed → Object.keys(null) → TypeError
    expect(() => a.transform(b, false)).not.toThrow();

    Delta.unregisterEmbed('img');
  });
});