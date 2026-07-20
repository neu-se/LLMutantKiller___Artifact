import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta.ts";

describe("invert()", () => {
  it("invert a retain with number after object retain", () => {
    Delta.registerEmbed("myembed", {
      compose: (a: unknown, b: unknown) => ({ ...(a as object), ...(b as object) }),
      transform: (a: unknown, b: unknown, _priority: boolean) => b,
      invert: (a: unknown, _b: unknown) => a,
    });

    // delta has a numeric retain with attributes followed by object retain
    const delta = new Delta()
      .retain(1, { bold: true })
      .retain({ myembed: { x: 1 } });
    const base = new Delta()
      .insert("a")
      .insert({ myembed: { x: 0 } });

    // Should not throw and should produce correct result
    const inverted = delta.invert(base);
    expect(base.compose(delta).compose(inverted)).toEqual(base);

    Delta.unregisterEmbed("myembed");
  });
});