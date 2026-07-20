import Delta from "../../../../../../../../../../../../../subject_repositories/delta/src/Delta";
import Op from "../../../../../../../../../../../../../subject_repositories/delta/src/Op";

describe("transform()", () => {
  it("transform embed with priority true applies handler transform", () => {
    Delta.registerEmbed<Op[]>("delta", {
      compose: (a: Op[], b: Op[]) => new Delta(a).compose(new Delta(b)).ops,
      transform: (a: Op[], b: Op[], priority: boolean) =>
        new Delta(a).transform(new Delta(b), priority).ops,
      invert: (a: Op[], b: Op[]) => new Delta(a).invert(new Delta(b)).ops,
    });

    const a = new Delta().retain({ delta: [{ insert: "a" }] });
    const b = new Delta().retain({ delta: [{ insert: "b" }] });
    const expected1 = new Delta().retain({
      delta: [{ retain: 1 }, { insert: "b" }],
    });
    const expected2 = new Delta().retain({ delta: [{ insert: "b" }] });

    try {
      expect(a.transform(b, true)).toEqual(expected1);
      expect(a.transform(b, false)).toEqual(expected2);
    } finally {
      Delta.unregisterEmbed("delta");
    }
  });
});