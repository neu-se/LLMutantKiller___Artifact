import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta.ts";

describe('Delta transform', () => {
  it('should call embed handler when both retains are embed objects with same type', () => {
    const transformFn = jest.fn((a: unknown, b: unknown, priority: boolean) => priority ? a : b);
    
    Delta.registerEmbed('image', {
      compose: (a: unknown, b: unknown, _keepNull: boolean) => b,
      invert: (a: unknown, b: unknown) => a,
      transform: transformFn,
    });

    const a = new Delta().retain({ image: { version: 1 } });
    const b = new Delta().retain({ image: { version: 2 } });

    a.transform(b, false);

    expect(transformFn).toHaveBeenCalledWith({ version: 1 }, { version: 2 }, false);

    Delta.unregisterEmbed('image');
  });
});