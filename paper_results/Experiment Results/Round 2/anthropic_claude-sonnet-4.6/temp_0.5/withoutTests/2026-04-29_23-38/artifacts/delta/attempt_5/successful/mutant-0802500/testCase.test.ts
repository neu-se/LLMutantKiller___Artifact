import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta.ts";

describe("Delta compose", () => {
  it("should preserve initial inserts from this when composing with retain then delete", () => {
    const a = new Delta([{insert: "A"}, {insert: "B"}, {insert: "C"}]);
    const b = new Delta().retain(2).delete(1);
    const result = a.compose(b);
    expect(result.ops).toEqual([{insert: "A"}, {insert: "B"}]);
  });
});