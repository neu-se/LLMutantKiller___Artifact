import pull from "../../../../../../../../../../../subject_repositories/pull-stream/index.js";

describe('find - no match found', () => {
  it('should call callback with null error when no item matches the predicate', (done) => {
    pull(
      pull.values([1, 2, 3, 4, 5]),
      pull.find(function (d: number) {
        return d === 99;
      }, function (err: any, found: any) {
        expect(err).toBeNull();
        expect(found).toBeNull();
        done();
      })
    );
  });
});