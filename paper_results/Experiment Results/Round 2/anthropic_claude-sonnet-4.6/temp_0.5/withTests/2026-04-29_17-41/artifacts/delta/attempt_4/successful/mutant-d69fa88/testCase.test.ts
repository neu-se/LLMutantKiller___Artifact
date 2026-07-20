import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe("invert()", () => {
  it("invert does not throw on op with no retain, insert, or delete", () => {
    // An op with only attributes and no retain/insert/delete
    // Original: falls through to return baseIndex (no error)
    // Mutated: undefined !== null is true, enters embed branch, throws
    const delta = new Delta([{ attributes: { bold: true } } as any]);
    const base = new Delta().insert("a");
    expect(() => delta.invert(base)).not.toThrow();
  });
});