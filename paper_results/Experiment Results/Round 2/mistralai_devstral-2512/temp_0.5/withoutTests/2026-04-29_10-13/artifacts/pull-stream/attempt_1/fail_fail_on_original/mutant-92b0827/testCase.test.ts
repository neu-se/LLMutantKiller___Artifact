import { reduce } from "../../../../../../../../../../../subject_repositories/pull-stream/sinks/reduce.js";

describe('reduce sink with immediate end', () => {
  it('should call callback with null when source ends immediately with true', (done) => {
    const reducer = jest.fn((acc, data) => data);
    const source = jest.fn((abort, cb) => {
      cb(true, null); // end immediately with true
    });

    reduce(reducer, (err, result) => {
      expect(err).toBeNull();
      expect(result).toBeNull();
      done();
    })(source);
  });
});