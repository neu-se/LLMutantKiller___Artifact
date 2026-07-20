import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe('Delta diff method error messages', () => {
  it('should use correct preposition in error message based on which delta is non-document', () => {
    const documentDelta = new Delta([{ insert: 'test' }]);
    const nonDocumentDelta = new Delta([{ retain: 1 }]);

    // Test case 1: non-document is first parameter (should use "on")
    expect(() => {
      nonDocumentDelta.diff(documentDelta);
    }).toThrow('diff() called on non-document');

    // Test case 2: non-document is second parameter (should use "with")
    expect(() => {
      documentDelta.diff(nonDocumentDelta);
    }).toThrow('diff() called with non-document');
  });
});