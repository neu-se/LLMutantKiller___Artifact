const pull = require('../../../../../../../../../../../subject_repositories/pull-stream/pull.js');

describe('count source behavior at max boundary', () => {
  it('should emit exactly max values when max is finite', (done) => {
    pull(
      pull.count(3),
      pull.collect((err: any, results: any) => {
        expect(err).toBeNull();
        expect(results).toEqual([0, 1, 2]);
        done();
      })
    );
  });
});