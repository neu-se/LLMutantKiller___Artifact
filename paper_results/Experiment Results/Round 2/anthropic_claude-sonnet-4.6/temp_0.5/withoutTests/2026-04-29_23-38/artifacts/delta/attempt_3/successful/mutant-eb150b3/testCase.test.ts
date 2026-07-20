import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe("Delta compose embed handler keepNull parameter", () => {
  it("passes keepNull=false when composing insert embed with retain embed (action is insert)", () => {
    Delta.registerEmbed("myEmbed", {
      compose(_a: unknown, _b: unknown, keepNull: boolean) {
        // Return a value that encodes the keepNull parameter so we can observe it
        return keepNull ? "keepNull_was_true" : "keepNull_was_false";
      },
      invert(_a: unknown, _b: unknown) {
        return {};
      },
      transform(a: unknown, _b: unknown, _priority: boolean) {
        return a;
      },
    });

    try {
      // thisOp will be an insert embed, otherOp will be a retain embed
      // action = 'insert' (since thisOp.retain is null, thisOp.insert is the embed)
      // Original: keepNull = (action === 'retain') = false
      // Mutant:   keepNull = (action !== 'retain') = true
      const base = new Delta().insert({ myEmbed: { val: 1 } });
      const other = new Delta().retain({ myEmbed: { val: 2 } });

      const result = base.compose(other);

      // Original: keepNull=false => "keepNull_was_false"
      // Mutant:   keepNull=true  => "keepNull_was_true"
      expect(result.ops[0].insert).toEqual({
        myEmbed: "keepNull_was_false",
      });
    } finally {
      Delta.unregisterEmbed("myEmbed");
    }
  });
});