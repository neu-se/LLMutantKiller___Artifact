import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe('Delta diff method', () => {
  it('should throw "on non-document" when first delta is non-document', () => {
    const nonDocumentDelta = new Delta([{ retain: 1 }]);
    const documentDelta = new Delta([{ insert: 'test' }]);

    expect(() => {
      nonDocumentDelta.diff(documentDelta);
    }).toThrow('diff() called on non-document');
  });
});