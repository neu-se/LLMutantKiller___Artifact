import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe("Delta diff error message", () => {
  it("should include 'with' in error message when this delta has a non-insert op", () => {
    const nonDocumentDelta = new Delta().retain(5);
    const otherDelta = new Delta().insert("hello");

    let errorMessage = "";
    try {
      nonDocumentDelta.diff(otherDelta);
    } catch (e) {
      errorMessage = (e as Error).message;
    }

    expect(errorMessage).toBe("diff() called with non-document");
  });
});