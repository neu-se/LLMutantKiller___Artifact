import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe("Delta compose", () => {
  it("correctly composes when other starts with object retain and this has inserts before embed", () => {
    Delta.registerEmbed("image", {
      compose: (_a: unknown, b: unknown, _keepNull: boolean) => b,
      invert: (_a: unknown, b: unknown) => b,
      transform: (_a: unknown, b: unknown, _priority: boolean) => b,
    });

    const a = new Delta()
      .insert("hello")
      .insert({ image: { src: "a.png" } });

    const b = new Delta()
      .retain(5)
      .retain({ image: { src: "b.png" } });

    const result = a.compose(b);

    expect(result.ops).toEqual([
      { insert: "hello" },
      { insert: { image: { src: "b.png" } } },
    ]);

    Delta.unregisterEmbed("image");
  });
});