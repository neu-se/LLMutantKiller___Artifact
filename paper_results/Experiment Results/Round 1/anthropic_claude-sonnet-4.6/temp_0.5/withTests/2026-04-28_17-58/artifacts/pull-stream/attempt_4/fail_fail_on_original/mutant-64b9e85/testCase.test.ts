import pull from "../../../../../../../../../../../subject_repositories/pull-stream/index.js";

describe('find', () => {
  it('should not call callback with true as error after finding a match', (done) => {
    const calls: Array<[any, any]> = [];
    
    pull(
      pull.values([1, 2, 3, 7, 8, 9]),
      pull.find(function (d: number) {
        return d === 7;
      }, function (err: any, found: any) {
        calls.push([err, found]);
        if (calls.length === 1) {
          // First call: found the item
          expect(err).toBeNull();
          expect(found).toBe(7);
        }
        if (calls.length === 2) {
          // Second call from end handler: error must be null, not true
          expect(err).toBeNull();
          done();
        }
      })
    );
  });
});