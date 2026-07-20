import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe('Delta transform with embeds', () => {
  it('should not transform when thisData is null', () => {
    const embedType = 'custom';
    let transformCalled = false;

    Delta.registerEmbed(embedType, {
      compose: (a: unknown, b: unknown) => b,
      invert: (a: unknown, b: unknown) => b,
      transform: (a: unknown, b: unknown, priority: boolean) => {
        transformCalled = true;
        return priority ? a : b;
      }
    });

    const delta1 = new Delta().retain({ [embedType]: null });
    const delta2 = new Delta().retain({ [embedType]: { value: 1 } });

    delta1.transform(delta2, true);

    expect(transformCalled).toBe(false);

    Delta.unregisterEmbed(embedType);
  });
});