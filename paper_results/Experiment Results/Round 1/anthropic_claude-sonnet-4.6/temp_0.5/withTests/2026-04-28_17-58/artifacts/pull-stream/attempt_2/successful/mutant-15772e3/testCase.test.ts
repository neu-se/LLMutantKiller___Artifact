import filter from '../../../../../../../../../../../subject_repositories/pull-stream/throughs/filter.js';

describe('filter through', () => {
  it('should correctly pass filtered values through an async source', (done) => {
    const values = [1, 2, 3, 4, 5];
    let i = 0;

    // Async source: callbacks fire on next tick, ensuring we exit the while loop
    // before the callback is invoked. This makes sync=false critical.
    // With the mutation (sync=true always), when an odd number is filtered out
    // asynchronously, loop=true is set but we're past the while loop, so the
    // next read never happens and the stream hangs indefinitely.
    function asyncSource(end: any, cb: (end: any, data?: any) => void): void {
      if (end) {
        cb(end);
        return;
      }
      if (i >= values.length) {
        cb(true);
        return;
      }
      const val = values[i++];
      setImmediate(() => cb(null, val));
    }

    // Only pass even numbers; odd numbers (1, 3, 5) must be skipped asynchronously
    const filterThrough = filter((x: number) => x % 2 === 0);
    const source = filterThrough(asyncSource);

    const results: number[] = [];

    function read(): void {
      source(null, (end: any, data: any) => {
        if (end === true) {
          expect(results).toEqual([2, 4]);
          done();
          return;
        }
        if (end) {
          done(end);
          return;
        }
        results.push(data);
        read();
      });
    }

    read();
  }, 3000);
});