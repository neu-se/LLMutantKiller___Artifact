import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe("insert() with empty string", () => {
  it("should not create an op when inserting an empty string", () => {
    const delta = new Delta().insert("");
    expect(delta.ops.length).toBe(0);
  });
});