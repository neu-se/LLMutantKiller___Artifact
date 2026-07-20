import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe("Delta compose with embed handler keepNull parameter", () => {
  it("passes keepNull=true when composing retain embed ops, meaning action === 'retain' sets keepNull to true", () => {
    Delta.registerEmbed("custom", {
      compose(a: unknown, b: unknown, keepNull: boolean) {
        if (keepNull) {
          return { result: "keepNull_true" };
        } else {
          return { result: "keepNull_false" };
        }
      },
      invert(_a: unknown, _b: unknown) {
        return {};
      },
      transform(a: unknown, _b: unknown, _priority: boolean) {
        return a;
      },
    });

    try {
      // base has an embed insert, retain applies an embed retain on top
      // In compose: thisOp.retain is object => action = 'retain'
      // Original: keepNull = (action === 'retain') = true
      // Mutant:   keepNull = (action !== 'retain') = false
      const base = new Delta().insert({ custom: { value: 1 } });
      const retain = new Delta().retain({ custom: { value: 2 } });

      const result = base.compose(retain);

      // Original code: keepNull=true => result is { result: "keepNull_true" }
      // Mutated code:  keepNull=false => result is { result: "keepNull_false" }
      expect(result.ops[0].insert).toEqual({
        custom: { result: "keepNull_true" },
      });
    } finally {
      Delta.unregisterEmbed("custom");
    }
  });
});