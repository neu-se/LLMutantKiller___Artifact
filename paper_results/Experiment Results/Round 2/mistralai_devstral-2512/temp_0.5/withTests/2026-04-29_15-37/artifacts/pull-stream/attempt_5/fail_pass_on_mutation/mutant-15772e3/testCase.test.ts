import pull from '../../../../../../../../../../../subject_repositories/pull-stream';
import filter from '../../../../../../../../../../../subject_repositories/pull-stream/throughs/filter';

describe('filter mutation test', () => {
  it('should correctly handle synchronous filtering with immediate false condition', (done) => {
    const testData = [1, 2, 3, 4, 5];
    let filteredValues: number[] = [];
    let readCount = 0;

    pull(
      pull.values(testData),
      filter((d: number) => {
        readCount++;
        return false; // Always filter out
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
          expect(filteredValues).toEqual([]);
          expect(readCount).toBe(5);
          done();
        }
      )
    );
  });
});