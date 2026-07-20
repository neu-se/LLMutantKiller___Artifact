import pull from '../../../../../../../../../../../subject_repositories/pull-stream';
import filter from '../../../../../../../../../../../subject_repositories/pull-stream/throughs/filter';

describe('filter sync behavior', () => {
  it('should filter data correctly with synchronous test function', (done) => {
    const input = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    const expected = [2, 4, 6, 8, 10];

    pull(
      pull.values(input),
      filter((d: number) => d % 2 === 0),
      pull.collect((err: Error | null, result: number[]) => {
        if (err) {
          done(err);
          return;
        }
        expect(result).toEqual(expected);
        done();
      })
    );
  });
});