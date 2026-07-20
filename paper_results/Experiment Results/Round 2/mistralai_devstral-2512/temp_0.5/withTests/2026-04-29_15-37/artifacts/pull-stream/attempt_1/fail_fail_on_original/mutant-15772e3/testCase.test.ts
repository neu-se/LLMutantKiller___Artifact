import { createReadStream } from 'fs';
import { join } from 'path';
import pull from '../';
import filter from '../throughs/filter';

describe('filter mutation test', () => {
  it('should correctly filter data when sync flag is properly managed', (done) => {
    const testData = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    const expectedFiltered = [2, 4, 6, 8, 10];
    let result: number[] = [];

    pull(
      pull.values(testData),
      filter((d: number) => d % 2 === 0),
      pull.collect((err, data) => {
        if (err) {
          done(err);
          return;
        }
        result = data as number[];
        expect(result).toEqual(expectedFiltered);
        done();
      })
    );
  });
});