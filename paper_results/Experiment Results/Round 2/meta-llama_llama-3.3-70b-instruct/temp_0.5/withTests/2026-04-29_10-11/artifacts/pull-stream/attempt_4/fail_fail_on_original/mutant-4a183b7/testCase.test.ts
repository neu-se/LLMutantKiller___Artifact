import pull from '../../../../../../../../../../../subject_repositories/pull-stream/pull.js'

describe('pull-stream', () => {
  it('should pass through values when read.source is a function', () => {
    const values = [1, 2, 3];
    const read = {
      source: () => {
        return function (end: any, cb: any) {
          if (end) return cb(end);
          cb(null, values.shift());
        };
      },
    };

    const result: any[] = [];
    pull(
      read,
      (read: any) => {
        return function (end: any, cb: any) {
          read(end, (end: any, data: any) => {
            if (end) return cb(end);
            result.push(data);
            cb(null, data);
          });
        };
      },
      (read: any) => {
        return function (end: any, cb: any) {
          read(end, (end: any, data: any) => {
            if (end) return cb(end);
            result.push(data);
            cb(null, data);
          });
        };
      }
    )(null, (end: any, data: any) => {
      if (end) return;
      result.push(data);
    });
    pull(
      read,
      (read: any) => {
        return function (end: any, cb: any) {
          read(end, (end: any, data: any) => {
            if (end) return cb(end);
            result.push(data);
            cb(null, data);
          });
        };
      },
      (read: any) => {
        return function (end: any, cb: any) {
          read(end, (end: any, data: any) => {
            if (end) return cb(end);
            result.push(data);
            cb(null, data);
          });
        };
      }
    )(null, (end: any, data: any) => {
      if (end) return;
      result.push(data);
    });
    pull(
      read,
      (read: any) => {
        return function (end: any, cb: any) {
          read(end, (end: any, data: any) => {
            if (end) return cb(end);
            result.push(data);
            cb(null, data);
          });
        };
      },
      (read: any) => {
        return function (end: any, cb: any) {
          read(end, (end: any, data: any) => {
            if (end) return cb(end);
            result.push(data);
            cb(null, data);
          });
        };
      }
    )(null, (end: any, data: any) => {
      if (end) return;
      result.push(data);
    });

    expect(result).toEqual([1, 1, 1]);
  });
});