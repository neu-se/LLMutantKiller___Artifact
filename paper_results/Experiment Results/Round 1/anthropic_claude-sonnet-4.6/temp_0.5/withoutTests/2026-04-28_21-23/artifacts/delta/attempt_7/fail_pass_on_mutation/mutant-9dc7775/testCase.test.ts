import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe('Delta transform', () => {
  it('should handle null thisData without throwing', () => {
    Delta.registerEmbed('img', {
      compose: (a: unknown, b: unknown, _: boolean) => b,
      invert: (a: unknown, b: unknown) => a,
      transform: (a: unknown, b: unknown, _: boolean) => b,
    });

    const a = new Delta();
    (a as any).ops = [{ retain: null }];
    const b = new Delta().retain({ img: { src: 'test.png' } });

    expect(() => a.transform(b, false)).not.toThrow();

    Delta.unregisterEmbed('img');
  });
});