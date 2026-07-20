import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";
import Op from "../../../../../../../../../../../subject_repositories/delta/src/Op";

describe("transform()", () => {
  it("retains other embed data unchanged when embed types do not match", () => {
    Delta.registerEmbed<Op[]>("typeA", {
      compose: (a: Op[], b: Op[]) => new Delta(a).compose(new Delta(b)).ops,
      transform: (_a: Op[], _b: Op[], _priority: boolean) => [],
      invert: (a: Op[], b: Op[]) => new Delta(a).invert(new Delta(b)).ops,
    });
    Delta.registerEmbed<Op[]>("typeB", {
      compose: (a: Op[], b: Op[]) => new Delta(a).compose(new Delta(b)).ops,
      transform: (_a: Op[], _b: Op[], _priority: boolean) => [],
      invert: (a: Op[], b: Op[]) => new Delta(a).invert(new Delta(b)).ops,
    });

    const a = new Delta().retain({ typeA: [{ insert: "a" }] });
    const b = new Delta().retain({ typeB: [{ insert: "b" }] });

    try {
      expect(() => a.transform(b, true)).toThrow();
    } finally {
      Delta.unregisterEmbed("typeA");
      Delta.unregisterEmbed("typeB");
    }
  });
});