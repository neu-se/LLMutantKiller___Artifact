import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe("Delta invert", () => {
  it("should correctly handle mixed retain operations with object and number types", () => {
    Delta.registerEmbed("embed", {
      compose: (a: any, b: any) => b,
      invert: (a: any, b: any) => b,
      transform: (a: any, b: any) => b
    });

    const base = new Delta()
      .insert("text")
      .insert({ embed: { id: 1 } });
    const delta = new Delta()
      .retain(4)
      .retain({ embed: { id: 2 } });
    const inverted = delta.invert(base);
    const expected = new Delta()
      .retain(4)
      .retain({ embed: { id: 1 } });
    expect(inverted.ops).toEqual(expected.ops);
  });
});