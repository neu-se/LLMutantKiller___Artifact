import { reduce } from '../../sinks/reduce';

describe('reduce function', () => {
  it('should handle ended stream with no initial value correctly', (done) => {
    const reducer = (acc: any, data: any) => data;
    const cb = (err: any, result: any) => {
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
      if (end === false) {
        return cb(end, null);
      }
      if (data === undefined) {
        return cb(null, null);
      }
    };

    const reduced = reduce(reducer, cb);
    reduced(source);
  });
});