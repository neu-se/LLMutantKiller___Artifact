import filter from '../../../../../../../../../../../subject_repositories/pull-stream/throughs/filter.js';

describe('filter through', () => {
  it('should correctly filter items from an async source and not hang', (done) => {
    const values = [1, 2, 3, 4, 5];
    let i = 0;

    // Async source - callbacks fire asynchronously
    function asyncSource(end: any, cb: (end: any, data?: any) => void) {
      if (end) return cb(end);
      if (i >= values.length) return cb(true);
      const val = values[i++];
      setImmediate(() => cb(null, val));
    }

    // Only keep even numbers (1, 3, 5 are filtered out - async callbacks for filtered items)
    const filteredRead = filter((d: number) => d % 2 === 0)(asyncSource);

    const results: number[] = [];

    function readNext() {
      filteredRead(null, (end: any, data?: any) => {
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
        readNext();
      });
    }

    readNext();
  });
});