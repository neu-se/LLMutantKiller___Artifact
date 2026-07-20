import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta.ts";

describe("Delta.diff error message", () => {
  it("should include 'with' in the error message when diff is called with a non-document delta", () => {
    const delta = new Delta().insert("hello");
    const nonDocument = new Delta().retain(5); // retain ops are not valid in a document

    let errorMessage = "";
    try {
      delta.diff(nonDocument);
    } catch (e) {
      errorMessage = (e as Error).message;
    }

    expect(errorMessage).toBe("diff() called with non-document");
  });
});