import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta.ts";

describe("Delta compose with embed handler keepNull parameter", () => {
  it("passes keepNull=true when composing retain embed operations", () => {
    // Register an embed handler that uses keepNull to preserve null attributes
    const embedType = "test-embed";
    
    Delta.registerEmbed(embedType, {
      compose(a: unknown, b: unknown, keepNull: boolean): unknown {
        const aObj = a as Record<string, unknown>;
        const bObj = b as Record<string, unknown>;
        const result: Record<string, unknown> = { ...aObj };
        
        for (const key of Object.keys(bObj)) {
          if (bObj[key] === null) {
            if (keepNull) {
              result[key] = null; // preserve null only when keepNull is true
            } else {
              delete result[key]; // remove null when keepNull is false
            }
          } else {
            result[key] = bObj[key];
          }
        }
        
        return result;
      },
      invert(a: unknown, b: unknown): unknown {
        return b;
      },
      transform(a: unknown, b: unknown, priority: boolean): unknown {
        return b;
      },
    });

    try {
      // Create a delta that retains an embed
      const base = new Delta().insert({ [embedType]: { key: "value" } });
      
      // First delta: retain the embed with some modification
      const delta1 = new Delta().retain({ [embedType]: { key: "value" } });
      
      // Second delta: retain the embed, setting key to null (should be preserved with keepNull=true)
      const delta2 = new Delta().retain({ [embedType]: { key: null } });
      
      // Compose delta1 and delta2
      const composed = delta1.compose(delta2);
      
      // With original code: action === 'retain' => keepNull = true
      // So null values should be preserved in the result
      // With mutated code: action === "" => keepNull = false
      // So null values should be removed from the result
      
      expect(composed.ops).toHaveLength(1);
      expect(composed.ops[0].retain).toEqual({ [embedType]: { key: null } });
    } finally {
      Delta.unregisterEmbed(embedType);
    }
  });
});