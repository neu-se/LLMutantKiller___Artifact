import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta.ts";

describe("invert()", () => {
  it("correctly inverts a delta with an insert op without entering embed handler branch", () => {
    Delta.registerEmbed("delta", {
      compose: (a: unknown, b: unknown) =>
        new Delta(a as any[]).compose(new Delta(b as any[])).ops,
      transform: (a: unknown, b: unknown, priority: boolean) =>
        new Delta(a as any[]).transform(new Delta(b as any[]), priority).ops,
      invert: (a: unknown, b: unknown) =>
        new Delta(a as any[]).invert(new Delta(b as any[])).ops,
    });

    const delta = new Delta().retain(2).insert("A");
    const base = new Delta().insert("123456");
    const expected = new Delta().retain(2).delete(1);
    const inverted = delta.invert(base);
    expect(inverted).toEqual(expected);

    Delta.unregisterEmbed("delta");
  });
});