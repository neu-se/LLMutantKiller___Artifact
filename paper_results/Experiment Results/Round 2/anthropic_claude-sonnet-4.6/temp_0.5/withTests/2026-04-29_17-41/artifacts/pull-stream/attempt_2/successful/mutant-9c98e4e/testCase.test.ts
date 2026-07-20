import count from '../../../../../../../../../../../subject_repositories/pull-stream/sources/count.js';

describe('count source', () => {
  it('should emit max+1 values from 0 through max inclusive when given a max argument', (done) => {
    const max = 5;
    const source = count(max);
    const results: number[] = [];

    function read() {
      source(null, (end: any, value: any) => {
        if (end === true) {
          expect(results).toHaveLength(max + 1);
          expect(results[0]).toBe(0);
          expect(results[results.length - 1]).toBe(max);
          done();
        } else if (end) {
          done(end);
        } else {
          results.push(value);
          read();
        }
      });
    }

    read();
  });
});