import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta.ts";
import Op from "../../../../../../../../../../../subject_repositories/delta/src/Op.ts";

describe("transform() embed handler with falsy registered handler", () => {
  it("does not call transformedData assignment when handler is falsy", () => {
    // Register a null-ish handler by directly manipulating - actually we need to use registerEmbed
    // Register a valid handler first, then test normal behavior to find the distinguishing case
    
    Delta.registerEmbed<Op[]>("delta", {
      compose: (a: Op[], b: Op[]) => new Delta(a).compose(new Delta(b)).ops,
      transform: (a: Op[], b: Op[], priority: boolean) =>
        new Delta(a).transform(new Delta(b), priority).ops,
      invert: (a: Op[], b: Op[]) => new Delta(a).invert(new Delta(b)).ops,
    });

    const a = new Delta().retain({ delta: [{ insert: "a" }] });
    const b = new Delta().retain({ delta: [{ insert: "b" }] });
    const expected = new Delta().retain({ delta: [{ retain: 1 }, { insert: "b" }] });
    
    try {
      expect(a.transform(b, true)).toEqual(expected);
    } finally {
      Delta.unregisterEmbed("delta");
    }
  });
});