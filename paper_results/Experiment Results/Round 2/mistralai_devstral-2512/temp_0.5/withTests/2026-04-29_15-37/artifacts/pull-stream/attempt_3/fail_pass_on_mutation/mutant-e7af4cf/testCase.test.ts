import pull from '../../../../../../../../../../../subject_repositories/pull-stream';
import filter from '../../../../../../../../../../../subject_repositories/pull-stream/throughs/filter';

describe('filter sync behavior', () => {
  it('should handle synchronous filtering correctly with multiple reads', (done) => {
    const input = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    const expected = [2, 4, 6, 8, 10];
    let readCount = 0;

    pull(
      pull.values(input),
      filter((d: number) => {
        readCount++;
        return d % 2 === 0;
      }),
      pull.collect((err: Error | null, result: number[]) => {
        if (err) {
          done(err);
          return;
        }
        expect(result).toEqual(expected);
        expect(readCount).toBeGreaterThanOrEqual(10);
        done();
      })
    );
  });
});