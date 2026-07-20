import values from "../../../../../../../../../../../subject_repositories/pull-stream/sources/values.js";

describe('values source', () => {
  it('should handle null input by not processing it', (done) => {
    const source = values(null);
    let callCount = 0;

    source(null, (end, data) => {
      callCount++;
      if (callCount === 1) {
        expect(end).toBe(true);
        done();
      }
    });
  });
});