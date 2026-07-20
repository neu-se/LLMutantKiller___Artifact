import pull from '../../../../../../../../../../../subject_repositories/pull-stream';
import filter from '../../../../../../../../../../../subject_repositories/pull-stream/throughs/filter';

describe('filter sync behavior', () => {
  it('should correctly handle synchronous filtering with immediate callback', (done) => {
    const input = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    const expected = [2, 4, 6, 8, 10];
    const callOrder: string[] = [];

    pull(
      pull.values(input),
      filter((d: number) => {
        callOrder.push(`test-${d}`);
        return d % 2 === 0;
      }),
      pull.drain(
        (data: number) => {
          callOrder.push(`drain-${data}`);
        },
        (err: Error | null) => {
          if (err) {
            done(err);
            return;
          }
          // The mutation changes sync behavior, so we check the exact order
          expect(callOrder).toEqual([
            'test-1', 'test-2', 'drain-2',
            'test-3', 'test-4', 'drain-4',
            'test-5', 'test-6', 'drain-6',
            'test-7', 'test-8', 'drain-8',
            'test-9', 'test-10', 'drain-10'
          ]);
          done();
        }
      )
    );
  });
});