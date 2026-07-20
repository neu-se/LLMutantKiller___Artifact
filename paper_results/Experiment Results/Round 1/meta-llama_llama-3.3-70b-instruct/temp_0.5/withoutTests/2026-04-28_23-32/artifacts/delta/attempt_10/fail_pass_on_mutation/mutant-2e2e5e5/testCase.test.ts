import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta.ts";

describe("Delta", () => {
  it("should throw an error with correct message when diff is called with delta equals other and prep is 'on'", () => {
    const delta1 = new Delta([{ insert: "Hello" }]);
    const delta2 = delta1;
    expect(() => delta1.diff(delta2)).not.toThrowError("diff() called with non-document");
  });
});