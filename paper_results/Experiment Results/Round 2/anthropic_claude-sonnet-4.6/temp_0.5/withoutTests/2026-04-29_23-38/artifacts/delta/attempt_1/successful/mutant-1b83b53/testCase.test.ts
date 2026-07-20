import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta.ts";

describe("Delta compose with embed keepNull parameter", () => {
  it("should pass keepNull=true when composing retain over retain on an embed", () => {
    // Register an embed handler that records the keepNull value
    let capturedKeepNull: boolean | undefined;
    
    Delta.registerEmbed("test", {
      compose(a: unknown, b: unknown, keepNull: boolean): unknown {
        capturedKeepNull = keepNull;
        // Return different results based on keepNull to make the test observable
        if (keepNull) {
          return { value: "retained", keepNull: true };
        } else {
          return { value: "inserted", keepNull: false };
        }
      },
      invert(a: unknown, b: unknown): unknown {
        return a;
      },
      transform(a: unknown, b: unknown, priority: boolean): unknown {
        return b;
      },
    });

    try {
      // Create a delta that retains an embed
      const base = new Delta().insert({ test: { value: "original" } });
      
      // First delta retains the embed with a modification
      const delta1 = new Delta().retain({ test: { value: "modified" } });
      
      // Second delta also retains the embed with another modification
      const delta2 = new Delta().retain({ test: { value: "another" } });
      
      // Compose delta1 with delta2 - this should call handler.compose with keepNull=true
      // because action === 'retain'
      const result = delta1.compose(delta2);
      
      // The keepNull should be true because we're retaining (action === 'retain')
      expect(capturedKeepNull).toBe(true);
      
      // With the original code, keepNull=true, so result should contain "retained"
      // With the mutated code, keepNull=false, so result would contain "inserted"
      expect(result.ops[0]).toEqual({
        retain: { test: { value: "retained", keepNull: true } }
      });
    } finally {
      Delta.unregisterEmbed("test");
    }
  });
});