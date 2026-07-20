import pull from '../../../../../../../../../../../subject_repositories/pull-stream';
import filter from '../../../../../../../../../../../subject_repositories/pull-stream/throughs/filter';

describe('filter mutation test', () => {
  it('should expose sync flag mutation in filter with synchronous filtering', (done) => {
    const testData = [1, 2, 3, 4, 5];
    let filteredValues: number[] = [];
    let readCount = 0;

    pull(
      pull.values(testData),
      filter((d: number) => {
        readCount++;
        return d > 3;
      }),
      pull.drain(
        (data: number) => {
          filteredValues.push(data);
        },
        (err: Error | null) => {
          if (err) {
            done(err);
            return;
          }
          expect(filteredValues).toEqual([4, 5]);
          expect(readCount).toBe(5);
          done();
        }
      )
    );
  });
});