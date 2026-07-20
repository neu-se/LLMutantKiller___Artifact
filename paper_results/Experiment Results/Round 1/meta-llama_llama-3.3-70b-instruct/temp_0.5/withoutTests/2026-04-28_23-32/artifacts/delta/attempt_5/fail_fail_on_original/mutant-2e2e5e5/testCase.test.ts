import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta.ts";

describe("Delta", () => {
  it("should throw an error with correct message when diff is called with non-document and delta does not equal other", () => {
    const delta1 = new Delta([{ insert: "Hello" }]);
    const delta2 = new Delta([{ delete: 5 }]);
    expect(() => delta1.diff(delta2)).toThrowError("diff() called with non-document");
  });
});