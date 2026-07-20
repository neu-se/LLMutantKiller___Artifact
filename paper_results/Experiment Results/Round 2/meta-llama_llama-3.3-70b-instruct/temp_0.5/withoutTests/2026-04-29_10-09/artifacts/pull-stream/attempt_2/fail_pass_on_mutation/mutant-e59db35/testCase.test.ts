import flatten from "../../../../../../../../../../../subject_repositories/pull-stream/throughs/flatten.js";

describe('flatten', () => {
  it('should handle abort and error correctly', (done) => {
    const read = jest.fn((abort, cb) => {
      if (abort) {
        cb(true, null); // simulate error after abort
      } else {
        cb(null, null); // simulate successful read
      }
    });

    const stream = flatten()(read);
    stream(true, (err) => {
      expect(err).toBe(true);
      done();
    });
  });
});