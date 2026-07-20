import pull from '../../../../../../../../../../../subject_repositories/pull-stream/pull.js';

describe('pull.js', () => {
  it('should handle more than 4 arguments', () => {
    const read = pull(
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
      if (end) return;
      results.push(data);
    });

    expect(read.length).toBe(2);
  });
});