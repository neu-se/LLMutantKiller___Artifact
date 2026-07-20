import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta.ts";

describe('Delta compose with embed keepNull parameter', () => {
  it('should pass keepNull=true when composing a retain embed (action === retain)', () => {
    // Register an embed handler that uses keepNull parameter
    const receivedKeepNull: boolean[] = [];
    
    Delta.registerEmbed('image', {
      compose(a: unknown, b: unknown, keepNull: boolean) {
        receivedKeepNull.push(keepNull);
        // When keepNull is true, preserve null values; when false, remove them
        if (keepNull) {
          return { ...( a as object), ...(b as object) };
        } else {
          const result: Record<string, unknown> = { ...(a as object) };
          const bObj = b as Record<string, unknown>;
          for (const key of Object.keys(bObj)) {
            if (bObj[key] !== null) {
              result[key] = bObj[key];
            }
          }
          return result;
        }
      },
      invert(a: unknown, b: unknown) { return b; },
      transform(a: unknown, b: unknown, priority: boolean) { return b; },
    });

    // Create a delta that retains an embed
    const base = new Delta().insert({ image: { src: 'url', alt: 'text' } });
    
    // Compose: retain the embed with modifications
    const change = new Delta().retain({ image: { src: null, alt: 'new text' } });
    
    const result = base.compose(change);
    
    // With keepNull=true (original): null values are preserved
    // With keepNull=false (mutated): null values are removed
    expect(result.ops[0].insert).toEqual({
      image: { src: null, alt: 'new text' }
    });
    
    Delta.unregisterEmbed('image');
  });
});