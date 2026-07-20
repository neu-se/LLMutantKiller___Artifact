import { take } from '../../../../../../../../../../../subject_repositories/pull-stream/throughs/take.js';

describe('take function', () => {
  it('should pass when run against the original code and fail when run against the mutated code', () => {
    const source = [1, 2, 3, 4, 5];
    let i = 0;
    let read = take(3)(function (end, cb) {
      if (end) return cb(end);
      cb(null, source[i++]);
    });

    let count = 0;
    read(null, function (_, data) {
      if (_) return;
      count++;
    });
    read(null, function (_, data) {
      if (_) return;
      count++;
    });
    read(null, function (_, data) {
      if (_) return;
      count++;
    });
    read(null, function (_, data) {
      if (_) return;
      count++;
    });

    expect(count).toBe(3);
  });
});