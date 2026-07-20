import values from "../../../../../../../../../../../subject_repositories/pull-stream/sources/values.js";

describe('values source', () => {
  it('should call callback with true when array is null', (done) => {
    const source = values(null);
    source(null, (end: boolean, data: unknown) => {
      expect(end).toBe(true);
      done();
    });
  });
});