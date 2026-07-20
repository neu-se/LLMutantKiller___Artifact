import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe("Delta", () => {
  it("transformPosition insert before position with priority true", () => {
    // (false || !priority) with priority=true gives false, no shift
    // So insert "ABC" at offset 0, transformPosition(3, true) should return 3
    const delta = new Delta().insert("ABC");
    expect(delta.transformPosition(3, true)).toEqual(3);
  });
});