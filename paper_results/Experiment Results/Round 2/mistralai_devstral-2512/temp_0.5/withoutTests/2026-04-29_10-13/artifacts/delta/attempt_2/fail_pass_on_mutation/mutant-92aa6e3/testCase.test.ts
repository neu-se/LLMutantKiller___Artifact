import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta.ts";

describe('Delta compose with embeds', () => {
  it('should correctly handle keepNull parameter in compose for retain action', () => {
    const embedType = 'test-embed';
    let capturedKeepNull: boolean | undefined;

    Delta.registerEmbed(embedType, {
      compose: (a, b, keepNull) => {
        capturedKeepNull = keepNull;
        return { ...a, ...b };
      },
      invert: (a, b) => ({ ...a, ...b }),
      transform: (a, b, priority) => ({ ...a, ...b }),
    });

    const delta1 = new Delta().retain({ [embedType]: { value: 1 } });
    const delta2 = new Delta().retain({ [embedType]: { value: 2 } });

    delta1.compose(delta2);

    expect(capturedKeepNull).toBe(true);

    Delta.unregisterEmbed(embedType);
  });
});