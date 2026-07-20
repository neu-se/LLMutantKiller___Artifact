import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta.ts";

describe("Delta compose with embed handler keepNull parameter", () => {
  it("should pass keepNull=false when composing an insert embed with a retain embed", () => {
    // Register an embed handler that returns different values based on keepNull
    Delta.registerEmbed("image", {
      compose(a: unknown, b: unknown, keepNull: boolean): unknown {
        // Return different results based on keepNull
        // When keepNull is false (insert case), return merged without nulls
        // When keepNull is true (retain case), preserve nulls
        const aObj = a as Record<string, unknown>;
        const bObj = b as Record<string, unknown>;
        const result: Record<string, unknown> = { ...aObj };
        for (const key of Object.keys(bObj)) {
          if (bObj[key] === null) {
            if (keepNull) {
              result[key] = null;
            } else {
              delete result[key];
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
      // Create a delta that inserts an embed
      const base = new Delta().insert({ image: { src: "http://example.com", alt: "test" } });
      
      // Create another delta that retains with embed modification (setting alt to null)
      const other = new Delta().retain({ image: { src: "http://example.com", alt: null } });
      
      // Compose: base has an insert embed, other has a retain embed
      // action = 'insert' because thisOp.retain == null (it's an insert)
      // So keepNull should be false in original, true in mutation
      const result = base.compose(other);
      
      // With keepNull=false (original): alt should be removed from result
      // With keepNull=true (mutation): alt should be null in result
      expect(result.ops).toHaveLength(1);
      expect(result.ops[0].insert).toBeDefined();
      const insertedImage = (result.ops[0].insert as Record<string, unknown>)["image"] as Record<string, unknown>;
      
      // In original (keepNull=false): alt is deleted
      expect(insertedImage).not.toHaveProperty("alt");
      // In mutation (keepNull=true): alt would be null
    } finally {
      Delta.unregisterEmbed("image");
    }
  });
});