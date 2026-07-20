import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta.ts";

describe("Delta compose with embed handler keepNull parameter", () => {
  it("passes keepNull=true when composing retain+retain embed ops", () => {
    // Register an embed handler that uses keepNull to decide behavior
    // When keepNull is true (retain case), it should preserve null attributes
    // When keepNull is false (insert case), it should remove null attributes
    const capturedArgs: { keepNull: boolean }[] = [];
    
    Delta.registerEmbed("custom", {
      compose(a: unknown, b: unknown, keepNull: boolean) {
        capturedArgs.push({ keepNull });
        // Return different values based on keepNull to make the test observable
        if (keepNull) {
          return { result: "keepNull_true", a, b };
        } else {
          return { result: "keepNull_false", a, b };
        }
      },
      invert(a: unknown, b: unknown) {
        return { inverted: true };
      },
      transform(a: unknown, b: unknown, priority: boolean) {
        return a;
      },
    });

    try {
      // Create a delta with a retain embed op (thisOp.retain is an object)
      // This triggers action === 'retain', so keepNull should be true in original
      const base = new Delta().insert({ custom: { value: 1 } });
      const retain = new Delta().retain({ custom: { value: 2 } });
      
      const result = base.compose(retain);
      
      // In the original code: action === 'retain' => keepNull = true => result.result === "keepNull_true"
      // In the mutated code: action !== 'retain' => keepNull = false => result.result === "keepNull_false"
      expect(result.ops).toHaveLength(1);
      expect(result.ops[0].insert).toEqual({
        custom: { result: "keepNull_true", a: { value: 1 }, b: { value: 2 } },
      });
    } finally {
      Delta.unregisterEmbed("custom");
    }
  });
});