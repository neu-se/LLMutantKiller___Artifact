import pull from '../../../../../../../../../../../subject_repositories/pull-stream';
import filter from '../../../../../../../../../../../subject_repositories/pull-stream/throughs/filter';

describe('filter mutation test', () => {
  it('should expose sync flag mutation in filter with synchronous filtering', (done) => {
    const testData = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    const expectedFiltered = [1, 3, 5, 7, 9];
    let result: number[] = [];
    let readCount = 0;

    pull(
      pull.values(testData),
      filter((d: number) => {
        readCount++;
        return d % 2 === 1;
      }),
      pull.collect((err: Error | null, data: number[]) => {
        if (err) {
          done(err);
          return;
        }
        result = data;
        expect(result).toEqual(expectedFiltered);
        expect(readCount).toBe(10);
        done();
      })
    );
  });
});