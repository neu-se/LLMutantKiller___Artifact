import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe("Delta.diff error message", () => {
  it("should include 'with' in the error message when this delta is not a document", () => {
    const a = new Delta().retain(5); // retain op makes 'this' a non-document
    const b = new Delta().insert("hello");

    let errorMessage = "";
    try {
      a.diff(b);
    } catch (e) {
      errorMessage = (e as Error).message;
    }

    expect(errorMessage).toBe("diff() called with non-document");
  });
});