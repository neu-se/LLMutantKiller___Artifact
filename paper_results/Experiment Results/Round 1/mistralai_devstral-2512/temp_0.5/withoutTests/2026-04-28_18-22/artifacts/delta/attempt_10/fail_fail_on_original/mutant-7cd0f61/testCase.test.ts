import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe('Delta diff method', () => {
  it('should use "with" when comparing document delta with non-document delta', () => {
    const documentDelta = new Delta([{ insert: 'test' }]);
    const nonDocumentDelta = new Delta([{ retain: 1 }]);

    expect(() => {
      documentDelta.diff(nonDocumentDelta);
    }).toThrow('diff() called with non-document');
  });
});