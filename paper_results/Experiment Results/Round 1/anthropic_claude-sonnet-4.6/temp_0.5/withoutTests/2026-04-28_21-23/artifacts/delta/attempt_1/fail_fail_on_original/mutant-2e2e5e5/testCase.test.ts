import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe("Delta diff error message", () => {
  it("should include 'with' in error message when diff is called with non-document delta", () => {
    const delta = new Delta().insert("hello");
    const nonDocumentDelta = new Delta().retain(5);

    let errorMessage = "";
    try {
      delta.diff(nonDocumentDelta);
    } catch (e) {
      errorMessage = (e as Error).message;
    }

    expect(errorMessage).toContain("with");
  });
});