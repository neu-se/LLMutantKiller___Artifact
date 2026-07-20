import * as pull from '../../../../../../../../../../../subject_repositories/pull-stream/pull.js';

describe('pull.js', () => {
  it('should handle more than 4 arguments', () => {
    const values = pull.values([1, 2, 3, 4, 5]);
    const read = pull(
      values,
      (read) => {
        return function (abort: any, cb: any) {
          read(abort, function (end: any, data: any) {
            if (end) cb(end);
            else cb(null, data);
          });
        };
      },
      (read) => {
        return function (abort: any, cb: any) {
          read(abort, function (end: any, data: any) {
            if (end) cb(end);
            else cb(null, data);
          });
        };
      },
      (read) => {
        return function (abort: any, cb: any) {
          read(abort, function (end: any, data: any) {
            if (end) cb(end);
            else cb(null, data);
          });
        };
      },
      (read) => {
        return function (abort: any, cb: any) {
          read(abort, function (end: any, data: any) {
            if (end) cb(end);
            else cb(null, data);
          });
        };
      }
    );

    let results: any[] = [];
    read(null, function (end: any, data: any) {
      if (end) return;
      results.push(data);
    });

    expect(results).toEqual([1, 2, 3, 4, 5]);
  });
});