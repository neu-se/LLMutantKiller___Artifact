import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe("Delta invert", () => {
  it("should correctly handle retain operations with object data when inverted", () => {
    // Register a handler for the embed type first
    Delta.registerEmbed("embed", {
      compose: (a: any, b: any) => b,
      invert: (a: any, b: any) => b,
      transform: (a: any, b: any) => b
    });

    const base = new Delta().insert({ embed: { id: 1 } });
    const delta = new Delta().retain({ embed: { id: 2 } });
    const inverted = delta.invert(base);
    const expected = new Delta().retain({ embed: { id: 1 } });
    expect(inverted.ops).toEqual(expected.ops);
  });
});