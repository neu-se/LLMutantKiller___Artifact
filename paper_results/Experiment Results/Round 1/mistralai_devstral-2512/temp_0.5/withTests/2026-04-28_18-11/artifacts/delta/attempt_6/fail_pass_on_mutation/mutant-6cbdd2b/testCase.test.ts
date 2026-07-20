import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe("compose() with retain optimization", () => {
  it("should handle retain with object embed and attributes correctly", () => {
    Delta.registerEmbed<{ id: number }>("custom", {
      compose: (a, b) => ({ id: a.id + b.id }),
      transform: (a, b, priority) => (priority ? a : b),
      invert: (a, b) => ({ id: b.id - a.id }),
    });

    const a = new Delta().insert({ custom: { id: 1 } }, { bold: true });
    const b = new Delta().retain({ custom: { id: 2 } }, { italic: true });
    const expected = new Delta().insert({ custom: { id: 3 } }, { bold: true, italic: true });
    expect(a.compose(b)).toEqual(expected);

    Delta.unregisterEmbed("custom");
  });
});