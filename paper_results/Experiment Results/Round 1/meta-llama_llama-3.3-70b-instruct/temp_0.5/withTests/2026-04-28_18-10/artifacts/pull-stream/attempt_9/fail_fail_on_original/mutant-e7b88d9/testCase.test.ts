import take from '../../../../../../../../../../../subject_repositories/pull-stream/throughs/take.js';
import values from '../../../../../../../../../../../subject_repositories/pull-stream/sources/values.js';
import collect from '../../../../../../../../../../../subject_repositories/pull-stream/sinks/collect.js';

describe('take function', () => {
  it('should pass when run against the original code and fail when run against the mutated code', (done) => {
    const source = [1, 2, 3, 4, 5];
    let result: any[] = [];

    const read = values(source);
    const takeStream = take(3);
    const collectStream = collect((err: any, data: any) => {
      if (err) throw err;
      result = data;
      expect(result.length).toBe(3);
      done();
    });

    read(null, (end: any, data: any) => {
      if (end) return collectStream(end, null);
      takeStream(null, (end: any, data: any) => {
        if (end) return collectStream(end, null);
        collectStream(null, data);
      })(end, data);
    });
  });
});