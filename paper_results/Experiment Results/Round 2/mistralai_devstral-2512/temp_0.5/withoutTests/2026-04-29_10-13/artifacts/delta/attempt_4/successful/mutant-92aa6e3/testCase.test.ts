import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe('Delta compose with embeds', () => {
  it('should correctly pass keepNull parameter based on action type', () => {
    const embedType = 'test-embed';
    let capturedKeepNullValue: boolean | undefined;

    Delta.registerEmbed(embedType, {
      compose: (a: any, b: any, keepNull: boolean) => {
        capturedKeepNullValue = keepNull;
        return { ...a, ...b };
      },
      invert: (a: any, b: any) => ({ ...a, ...b }),
      transform: (a: any, b: any, priority: boolean) => ({ ...a, ...b }),
    });

    // Create a delta with retain action
    const delta1 = new Delta().retain({ [embedType]: { data: 'test' } });
    const delta2 = new Delta().retain({ [embedType]: { data: 'test2' } });

    // Compose the deltas
    delta1.compose(delta2);

    // For retain action, keepNull should be true in original code
    // but will be true in mutated code (always true)
    expect(capturedKeepNullValue).toBe(true);

    // Now test with insert action
    const delta3 = new Delta().insert({ [embedType]: { data: 'test3' } });
    const delta4 = new Delta().retain({ [embedType]: { data: 'test4' } });

    delta3.compose(delta4);

    // For insert action, keepNull should be false in original code
    // but will be true in mutated code (always true)
    expect(capturedKeepNullValue).toBe(false);

    Delta.unregisterEmbed(embedType);
  });
});