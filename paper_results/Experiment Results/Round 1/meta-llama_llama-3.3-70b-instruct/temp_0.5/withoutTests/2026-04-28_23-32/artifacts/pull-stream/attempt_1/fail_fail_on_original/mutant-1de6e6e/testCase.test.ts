import { reduce } from "../../../../../../../../../../../subject_repositories/pull-stream/sinks/reduce.js";

describe('reduce function', () => {
  it('should call callback with error when source ends immediately with error', (done) => {
    const cb = (err, acc) => {
      expect(err).toBe('error');
      expect(acc).toBeUndefined();
      done();
    };
    const source = () => {
      return (err, cb) => {
        cb('error');
      };
    };
    const reducer = (acc, data) => acc;
    const sink = reduce(reducer, cb);
    sink(source());
  });
});