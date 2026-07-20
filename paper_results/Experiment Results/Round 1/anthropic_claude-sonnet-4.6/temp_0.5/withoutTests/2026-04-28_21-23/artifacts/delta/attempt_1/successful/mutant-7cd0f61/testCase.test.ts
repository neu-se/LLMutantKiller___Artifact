import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta.ts";

describe("Delta.diff error message when called with non-document", () => {
  it("should throw 'diff() called with non-document' when this delta contains non-insert ops", () => {
    const nonDocumentDelta = new Delta().retain(5);
    const otherDelta = new Delta().insert("hello");

    expect(() => {
      nonDocumentDelta.diff(otherDelta);
    }).toThrow("diff() called with non-document");
  });
});