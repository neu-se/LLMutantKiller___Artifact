import pull from '../../../../../../../../../../../subject_repositories/pull-stream/pull.js';

describe('pull.js', () => {
  it('should handle more than 4 arguments', () => {
    const source = function (read: any) {
      return function (end: any, cb: any) {
        if (end) cb(end);
        else cb(null, 1);
      };
    };

    const read = pull(
      source,
      (read: any) => {
        return function (abort: any, cb: any) {
          read(abort, function (end: any, data: any) {
            if (end) cb(end);
            else cb(null, data);
          });
        };
      },
      (read: any) => {
        return function (abort: any, cb: any) {
          read(abort, function (end: any, data: any) {
            if (end) cb(end);
            else cb(null, data);
          });
        };
      },
      (read: any) => {
        return function (abort: any, cb: any) {
          read(abort, function (end: any, data: any) {
            if (end) cb(end);
            else cb(null, data);
          });
        };
      },
      (read: any) => {
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
      if (end) throw new Error('Unexpected end');
      results.push(data);
    });

    expect(results.length).toBeGreaterThanOrEqual(1);
  });
});