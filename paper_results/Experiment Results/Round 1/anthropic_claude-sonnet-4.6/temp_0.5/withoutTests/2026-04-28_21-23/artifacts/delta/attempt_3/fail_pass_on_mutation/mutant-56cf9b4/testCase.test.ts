import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe("Delta invert", () => {
  it("should not retain when op.retain is truthy but op.attributes is falsy non-null", () => {
    const base = new Delta().insert("Hello");
    const delta = new Delta([{ retain: 5, attributes: (false as any) }]);
    const inverted = delta.invert(base);
    expect(inverted.ops).toEqual([]);
  });
});