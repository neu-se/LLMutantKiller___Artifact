import { createReadStream } from 'fs';
import { join } from 'path';
import pull from '../';
import filter from '../../../../../../../../../../../subject_repositories/pull-stream/throughs/filter.js';

describe('filter sync behavior', () => {
  it('should process data synchronously when filter condition is met', (done) => {
    const testData = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    const expectedFiltered = [2, 4, 6, 8, 10];
    const results: number[] = [];

    pull(
      pull.values(testData),
      filter((d: number) => d % 2 === 0),
      pull.collect((err, data) => {
        if (err) return done(err);
        expect(data).toEqual(expectedFiltered);
        done();
      })
    );
  });
});