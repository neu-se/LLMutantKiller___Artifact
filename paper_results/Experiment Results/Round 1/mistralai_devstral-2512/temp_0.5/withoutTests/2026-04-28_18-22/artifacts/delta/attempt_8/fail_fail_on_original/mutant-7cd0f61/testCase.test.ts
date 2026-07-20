import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe('Delta diff method', () => {
  it('should use "with" when second delta is non-document', () => {
    const documentDelta = new Delta([{ insert: 'test' }]);
    const nonDocumentDelta = new Delta([{ retain: 1 }]);

    expect(() => {
      documentDelta.diff(nonDocumentDelta);
    }).toThrow('diff() called with non-document');
  });
});