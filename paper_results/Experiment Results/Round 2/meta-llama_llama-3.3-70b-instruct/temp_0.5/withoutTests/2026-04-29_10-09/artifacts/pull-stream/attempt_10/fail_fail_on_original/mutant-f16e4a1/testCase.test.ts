import reduce from "../../../../../../../../../../../subject_repositories/pull-stream/sinks/reduce.js"

describe('reduce function', () => {
  it('should handle ended stream with no initial value correctly', (done) => {
    const reducer = (acc: any, data: any) => data;
    const cb = jest.fn((err: any, result: any) => {
      if (err) {
        done(err);
      } else {
        try {
          expect(result).toBeNull();
          done();
        } catch (e) {
          done(e);
        }
      }
    });

    const source = (end: any, data: any) => {
      if (end === true) {
        return cb(null, null);
      }
      if (end === false) {
        return cb(end, null);
      }
    };

    const reduced = reduce(reducer, cb);
    reduced(source);
  });
});