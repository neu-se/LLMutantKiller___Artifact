import { take } from '../../../../../../../../../../../subject_repositories/pull-stream/throughs/take.js';

describe('take function', () => {
  it('should pass when run against the original code and fail when run against the mutated code', () => {
    const source = [1, 2, 3, 4, 5];
    let count = 0;
    const read = take(3)(function (end: any, cb: any) {
      if (end) return cb(end);
      cb(null, source[count++]);
    });

    read(null, function (_, data: any) {
      if (_) return;
    });
    read(null, function (_, data: any) {
      if (_) return;
    });
    read(null, function (_, data: any) {
      if (_) return;
    });
    read(null, function (_, data: any) {
      if (_) return;
    });

    expect(count).toBe(3);
  });
});