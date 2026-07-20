import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe('Delta diff method', () => {
  it('should throw different error messages based on which delta is non-document', () => {
    const documentDelta = new Delta([{ insert: 'test' }]);
    const nonDocumentDelta = new Delta([{ retain: 1 }]);

    // Test when first delta is non-document
    expect(() => {
      nonDocumentDelta.diff(documentDelta);
    }).toThrow('diff() called on non-document');

    // Test when second delta is non-document
    expect(() => {
      documentDelta.diff(nonDocumentDelta);
    }).toThrow('diff() called with non-document');
  });
});