import { reduce } from "../../../../../../../../../../../subject_repositories/pull-stream/sinks/reduce.js";

describe('reduce', () => {
  it('should handle initial value and callback correctly', (done) => {
    const source = (end: boolean | Error, cb: (err: Error | boolean | null, data: number | undefined) => void) => {
      if (end) return cb(end);
      cb(null, 1);
      cb(null, 2);
      cb(null, 3);
      cb(true);
    };

    const reducer = (acc: number, current: number) => acc + current;
    reduce(reducer, 0, (err: any, result: any) => {
      if (err) {
        done(err);
      } else {
        expect(result).toBe(6);
        done();
      }
    })(source);
  });

  it('should handle initial value and callback correctly when stream ends immediately', (done) => {
    const source = (end: boolean | Error, cb: (err: Error | boolean | null, data: number | undefined) => void) => {
      if (end) return cb(end);
      cb(null, 1);
      cb(true);
    };

    const reducer = (acc: number, current: number) => acc + current;
    reduce(reducer, 0, (err: any, result: any) => {
      if (err) {
        done(err);
      } else {
        expect(result).toBe(1);
        done();
      }
    })(source);
  });

  it('should fail when stream ends immediately with no data and no initial value', (done) => {
    const source = (end: boolean | Error, cb: (err: Error | boolean | null, data: number | undefined) => void) => {
      if (end) return cb(end);
      cb(true);
    };

    const reducer = (acc: number, current: number) => acc + current;
    reduce(reducer, (err: any, result: any) => {
      if (err) {
        expect(err).toBeInstanceOf(Error);
        done();
      } else {
        done(new Error('Expected error'));
      }
    })(source);
  });
});