import pull from "../../../../../../../../../../../subject_repositories/pull-stream/index.js";

describe('find', () => {
  it('should pass null (not true) as error to callback when stream ends without finding a match', (done) => {
    const results: any[] = [];
    pull(
      pull.values([10, 20, 30]),
      pull.find(function (d: number) {
        return d === 999;
      }, function (err: any, found: any) {
        results.push(err);
        expect(err).toBe(null);
        expect(found).toBe(null);
        done();
      })
    );
  });
});