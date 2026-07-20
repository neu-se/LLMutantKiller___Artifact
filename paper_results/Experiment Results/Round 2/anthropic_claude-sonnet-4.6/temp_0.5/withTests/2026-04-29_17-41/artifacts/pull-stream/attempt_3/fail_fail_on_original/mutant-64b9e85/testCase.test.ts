import pull = require('../../../../../../../../../../../subject_repositories/pull-stream/pull.js');

describe('find sink', () => {
  it('should not call callback with an error after finding a matching item', (done) => {
    const calls: Array<[any, any]> = [];

    pull(
      pull.values([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]),
      pull.find(
        (d: number) => d === 3,
        (err: any, result: any) => {
          calls.push([err, result]);
          // After both calls complete, check the second call
          if (calls.length === 2) {
            // Original: second call has err=null
            // Mutated: second call has err=true
            expect(calls[1][0]).toBeNull();
            done();
          }
        }
      )
    );
  });
});