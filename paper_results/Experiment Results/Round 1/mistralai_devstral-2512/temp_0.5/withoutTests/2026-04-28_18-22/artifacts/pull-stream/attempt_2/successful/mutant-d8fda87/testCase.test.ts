import once from "../../../../../../../../../../../subject_repositories/pull-stream/sources/once.js";

describe('once source', () => {
  it('should call callback with true when aborted', (done) => {
    const testValue = 42;
    const source = once(testValue);

    source(true, (end) => {
      expect(end).toBe(true);
      done();
    });
  });
});