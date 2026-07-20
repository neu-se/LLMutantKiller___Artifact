import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta.ts";

describe("Delta", () => {
  it("should throw an error with correct message when diff is called with non-document and delta equals other", () => {
    const delta1 = new Delta([{ insert: "Hello" }]);
    expect(() => delta1.diff(delta1)).toThrowError("diff() called on non-document");
  });
});