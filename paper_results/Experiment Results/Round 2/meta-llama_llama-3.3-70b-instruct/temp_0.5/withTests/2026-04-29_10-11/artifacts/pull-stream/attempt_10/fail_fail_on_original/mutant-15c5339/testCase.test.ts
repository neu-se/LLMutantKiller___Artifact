import { take } from '../../../../../../../../../../../subject_repositories/pull-stream/throughs/take.js';

describe('take', () => {
  it('should pass when run against the original code and fail when run against the mutated code', async () => {
    const read = take(function (data) { return data < 3; });
    const source = (end, cb) => {
      if (end) return cb(end);
      cb(null, 1);
      cb(null, 2);
      cb(null, 3);
      cb(true);
    };
    let result = [];
    source(read, (end, data) => {
      if (end) return;
      result.push(data);
    });
    await new Promise(resolve => setTimeout(resolve, 100));
    expect(result).toEqual([1, 2]);
  });
});