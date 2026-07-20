import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe("Delta compose optimization for leading inserts with initial retain", () => {
  it("should correctly compose when other starts with retain and this starts with inserts", () => {
    // this delta: insert "AB" then retain 3 (total length 5)
    // other delta: retain 5 (retains everything)
    // Expected result: insert "AB", retain 3
    const thisDelta = new Delta().insert("AB").retain(3);
    const otherDelta = new Delta().retain(5);

    const result = thisDelta.compose(otherDelta);

    // The result should preserve the insert and retain
    expect(result.ops).toEqual([
      { insert: "AB" },
      { retain: 3 },
    ]);
  });
});