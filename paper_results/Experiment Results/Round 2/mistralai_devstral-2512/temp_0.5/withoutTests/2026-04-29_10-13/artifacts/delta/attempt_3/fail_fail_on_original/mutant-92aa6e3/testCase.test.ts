import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta.ts";

describe('Delta compose with embeds', () => {
  it('should differentiate between retain and insert actions in compose', () => {
    const embedType = 'custom-embed';
    let retainKeepNull: boolean | undefined;
    let insertKeepNull: boolean | undefined;

    Delta.registerEmbed(embedType, {
      compose: (a, b, keepNull) => {
        if (typeof a === 'object' && a !== null && 'retain' in a) {
          retainKeepNull = keepNull;
        } else {
          insertKeepNull = keepNull;
        }
        return { ...a, ...b };
      },
      invert: (a, b) => ({ ...a, ...b }),
      transform: (a, b, priority) => ({ ...a, ...b }),
    });

    // Test retain action
    const delta1 = new Delta().retain({ [embedType]: { value: 1 } });
    const delta2 = new Delta().retain({ [embedType]: { value: 2 } });
    delta1.compose(delta2);

    // Test insert action
    const delta3 = new Delta().insert({ [embedType]: { value: 3 } });
    const delta4 = new Delta().retain({ [embedType]: { value: 4 } });
    delta3.compose(delta4);

    // For retain action, keepNull should be true
    expect(retainKeepNull).toBe(true);
    // For insert action, keepNull should be false
    expect(insertKeepNull).toBe(false);

    Delta.unregisterEmbed(embedType);
  });
});