import values from "../../../../../../../../../../../subject_repositories/pull-stream/sources/values.js";

describe('values source', () => {
  it('should handle null input by immediately ending the stream', (done) => {
    const source = values(null);

    source(null, (end: any, data: any) => {
      expect(end).toBe(true);
      expect(data).toBeUndefined();
      done();
    });
  });
});