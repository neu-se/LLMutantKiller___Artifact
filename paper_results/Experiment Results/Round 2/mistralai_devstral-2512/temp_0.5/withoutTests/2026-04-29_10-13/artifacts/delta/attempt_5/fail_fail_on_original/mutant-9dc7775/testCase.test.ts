import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe('Delta transform with embeds', () => {
  it('should not transform embed when thisData is null', () => {
    const embedType = 'custom';
    let transformCalled = false;

    Delta.registerEmbed(embedType, {
      compose: (a: unknown, b: unknown, keepNull: boolean) => b,
      invert: (a: unknown, b: unknown) => b,
      transform: (a: unknown, b: unknown, priority: boolean) => {
        transformCalled = true;
        return priority ? a : b;
      }
    });

    const delta1 = new Delta().retain({ [embedType]: null });
    const delta2 = new Delta().retain({ [embedType]: { value: 1 } });

    const result = delta1.transform(delta2, true);

    expect(transformCalled).toBe(false);
    expect(result.ops.length).toBe(1);
    expect('retain' in result.ops[0]).toBe(true);
    expect(result.ops[0].retain).toEqual({ [embedType]: { value: 1 } });

    Delta.unregisterEmbed(embedType);
  });
});