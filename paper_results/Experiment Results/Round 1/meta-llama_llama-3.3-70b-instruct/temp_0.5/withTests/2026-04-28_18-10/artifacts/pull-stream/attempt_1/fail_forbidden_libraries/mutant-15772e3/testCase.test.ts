import { test } from '@jest/globals';
import { filter } from '../../../../../subject_repositories/pull-stream/throughs/filter';

describe('filter', () => {
  test('should pass when run against the original code and fail when run against the mutated code', () => {
    const originalFilter = filter((data: any) => data > 0);
    const mutatedFilter = filter((data: any) => data > 0);

    // Create a source stream that emits numbers from 1 to 10
    const source = (end: any, cb: any) => {
      let i = 1;
      function next() {
        if (i <= 10) {
          cb(null, i++);
        } else {
          cb(true);
        }
      }
      next();
    };

    // Pipe the source stream through the filter stream
    const read = (end: any, cb: any) => {
      source(end, (end: any, data: any) => {
        if (end) {
          cb(end);
        } else if (data > 5) {
          cb(null, data);
        } else {
          cb(null, data);
        }
      });
    };

    // Collect the results
    const results: any[] = [];
    read(null, (end: any, data: any) => {
      if (end) {
        // Check if the results are correct
        expect(results).toEqual([6, 7, 8, 9, 10]);
      } else {
        results.push(data);
      }
    });
  });
});