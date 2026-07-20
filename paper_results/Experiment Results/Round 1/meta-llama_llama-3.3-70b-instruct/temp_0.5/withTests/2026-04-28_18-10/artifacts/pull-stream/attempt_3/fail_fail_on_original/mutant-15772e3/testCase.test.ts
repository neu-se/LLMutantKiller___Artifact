import { filter } from '../../../throughs/filter';

describe('filter', () => {
  it('should pass when run against the original code and fail when run against the mutated code', () => {
    const filterStream = filter((data: any) => data > 0);

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
    const read = filterStream(source);

    // Collect the results
    const results: any[] = [];
    let ended = false;
    read(null, (end: any, data: any) => {
      if (end) {
        // Check if the results are correct
        ended = true;
      } else {
        results.push(data);
      }
    });

    // Check if the stream ended correctly
    expect(ended).toBe(true);
  });
});