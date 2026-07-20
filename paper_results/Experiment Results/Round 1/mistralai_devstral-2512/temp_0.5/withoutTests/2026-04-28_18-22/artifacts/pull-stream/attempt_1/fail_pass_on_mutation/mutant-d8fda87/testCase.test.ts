import once from "../../../../../../../../../../../subject_repositories/pull-stream/sources/once.js";

describe('once source', () => {
  it('should call callback with value when not aborted', (done) => {
    const testValue = 42;
    const source = once(testValue);

    source(null, (end, value) => {
      expect(end).toBeNull();
      expect(value).toBe(testValue);
      done();
    });
  });
});