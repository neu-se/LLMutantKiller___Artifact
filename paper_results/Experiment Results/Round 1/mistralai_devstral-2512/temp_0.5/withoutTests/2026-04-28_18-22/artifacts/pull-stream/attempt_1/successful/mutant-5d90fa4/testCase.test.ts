import values from "../../../../../../../../../../../subject_repositories/pull-stream/sources/values.js";

describe('values source', () => {
  it('should handle null input by converting to empty array', (done) => {
    const source = values(null);
    let count = 0;

    source(null, (end, data) => {
      if (end) {
        expect(count).toBe(0);
        done();
      } else {
        count++;
      }
    });
  });
});