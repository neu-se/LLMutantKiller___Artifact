import asyncMap from "../../../../../../../../../../../subject_repositories/pull-stream/throughs/async-map.js";

describe('asyncMap identity passthrough', () => {
  it('should pass data through unchanged when called with a falsy map argument', (done) => {
    const through = asyncMap(null);

    const values = [1, 2, 3];
    let i = 0;
    const source = (abort: any, cb: (end: any, data?: any) => void) => {
      if (abort) return cb(abort);
      if (i >= values.length) return cb(true);
      cb(null, values[i++]);
    };

    // In original: through(source) returns source (identity)
    // In mutated: through(source) returns undefined, causing TypeError
    const read = through(source);

    expect(typeof read).toBe('function');

    const collected: number[] = [];

    const drain = () => {
      read(null, (end: any, data?: any) => {
        if (end === true) {
          expect(collected).toEqual([1, 2, 3]);
          done();
        } else if (end) {
          done(end);
        } else {
          collected.push(data);
          drain();
        }
      });
    };

    drain();
  });
});