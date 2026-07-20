import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe('diff() error message', () => {
  it('should throw correct error message when called with non-document on document', () => {
    const nonDocument = new Delta().retain(1).insert('B');
    const document = new Delta().insert('A');
    try {
      nonDocument.diff(document);
      fail('Expected diff() to throw an error');
    } catch (error: unknown) {
      if (!(error instanceof Error)) {
        fail('Expected error to be an Error instance');
        return;
      }
      expect(error.message).toBe('diff() called with non-document');
    }
  });
});