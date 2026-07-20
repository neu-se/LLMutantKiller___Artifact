const count = require('../../../../../../../../../../../subject_repositories/pull-stream/sources/count.js');
const take = require('../../../../../../../../../../../subject_repositories/pull-stream/throughs/take.js');
const collect = require('../../../../../../../../../../../subject_repositories/pull-stream/sinks/collect.js');

describe('count source behavior at max boundary', () => {
  it('should emit exactly max values when max is finite', (done) => {
    const source = count(2);
    const pipeline = take(3)(source);
    collect((err: any, results: any) => {
      expect(err).toBeNull();
      expect(results).toEqual([0, 1]);
      done();
    })(pipeline);
  });
});