import reduce from "../../../../../../../../../../../subject_repositories/pull-stream/sinks/reduce.js"

describe('reduce function', () => {
  it('should handle ended stream with no initial value correctly', (done) => {
    const reducer = (acc: any, data: any) => data;
    let callbackCalled = false;
    const cb = (err: any, result: any) => {
      callbackCalled = true;
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
    };

    const source = (end: any, data: any) => {
      if (end === true) {
        return cb(null, null);
      }
    };

    const reduced = reduce(reducer, cb);
    reduced(source);
    setTimeout(() => {
      expect(callbackCalled).toBe(true);
      done();
    }, 10);
  });
});