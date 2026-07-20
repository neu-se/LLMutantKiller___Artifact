import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta.ts";

describe("Delta retain method", () => {
  it("should add an operation when retain length is a positive number", () => {
    const delta = new Delta();
    delta.retain(5);
    expect(delta.ops).toEqual([{ retain: 5 }]);
  });
});