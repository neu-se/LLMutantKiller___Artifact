import asyncMap from "../../../../../../../../../../../subject_repositories/pull-stream/throughs/async-map.js";

describe('asyncMap identity passthrough when called with falsy argument', () => {
  it('should act as identity through-stream when no map function is provided', (done) => {
    // When asyncMap is called with null/falsy, it returns the `id` function
    // id(readFn) should return readFn unchanged (original), not undefined (mutated)
    const through = asyncMap(null);

    const values = [10, 20, 30];
    let index = 0;

    const source = (abort: any, cb: (end: any, data?: any) => void) => {
      if (abort) return cb(abort);
      if (index >= values.length) return cb(true);
      cb(null, values[index++]);
    };

    // In original: through(source) === source (id returns its argument)
    // In mutated:  through(source) === undefined (id returns nothing)
    const readFn = through(source);

    expect(readFn).toBeDefined();
    expect(typeof readFn).toBe('function');

    const collected: any[] = [];

    function readNext() {
      readFn(null, (end: any, data: any) => {
        if (end === true) {
          expect(collected).toEqual([10, 20, 30]);
          done();
        } else if (end) {
          done(end);
        } else {
          collected.push(data);
          readNext();
        }
      });
    }

    readNext();
  });
});