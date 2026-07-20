import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe("Delta invert", () => {
  it("should not retain when op.attributes is falsy non-null, even with following content", () => {
    // Base has text, delta retains with falsy attributes then deletes
    // The retain won't be at the end, so chop() won't remove it
    const base = new Delta().insert("Hello World");
    const delta = new Delta([
      { retain: 5, attributes: (false as any) },
      { delete: 6 },
    ]);
    const inverted = delta.invert(base);
    // Original: retain part produces nothing (op.retain && false = false), delete produces insert "World "
    // Mutated: retain part produces {retain: 5}, delete produces insert " World"
    // Just check the first op
    expect(inverted.ops[0]).toEqual({ insert: " World" });
  });
});