import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe('diff() error message', () => {
  it('should throw correct error message when called on document with non-document', () => {
    const a = new Delta().insert('A');
    const b = new Delta().retain(1).insert('B');
    try {
      a.diff(b);
      fail('Expected diff() to throw an error');
    } catch (error) {
      expect(error.message).toBe('diff() called with non-document');
    }
  });
});