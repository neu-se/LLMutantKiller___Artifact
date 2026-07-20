import pull from '../../../../../../../../../../../subject_repositories/pull-stream';
import filter from '../../../../../../../../../../../subject_repositories/pull-stream/throughs/filter';

describe('filter sync behavior', () => {
  it('should correctly handle synchronous filtering with immediate callback', (done) => {
    const input = [1, 2, 3, 4, 5];
    const expected = [2, 4];
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
          expect(callOrder).toEqual([
            'test-1', 'drain-2',
            'test-2', 'drain-4',
            'test-3', 'test-4', 'test-5'
          ]);
          done();
        }
      )
    );
  });
});