import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe("insert() with non-string argument", () => {
  it("should create an op when inserting a non-empty object", () => {
    const delta = new Delta().insert({ embed: 1 });
    expect(delta.ops.length).toBe(1);
    expect(delta.ops[0]).toEqual({ insert: { embed: 1 } });
  });
});