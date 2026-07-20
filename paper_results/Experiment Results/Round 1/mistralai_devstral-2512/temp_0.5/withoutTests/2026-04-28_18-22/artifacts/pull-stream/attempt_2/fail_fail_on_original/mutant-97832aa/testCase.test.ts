import pull from "../../../../../../../../../../../subject_repositories/pull-stream/pull.js";

describe('pull stream mutation test', () => {
  it('should handle object streams correctly', () => {
    const source = {
      source: function (abort: any, cb: (end: any, data?: any) => void) {
        cb(null, { value: 1 });
        cb(null, { value: 2 });
        cb(true);
      }
    };

    const transform = {
      source: function (read: (abort: any, cb: (end: any, data?: any) => void) => void) {
        return function (abort: any, cb: (end: any, data?: any) => void) {
          read(abort, function (end: any, data: any) {
            if (end) return cb(end);
            cb(null, { value: data.value * 2 });
          });
        };
      },
      sink: function (read: (abort: any, cb: (end: any, data?: any) => void) => void) {
        return function (abort: any, cb: (end: any, data?: any) => void) {
          read(abort, function (end: any, data: any) {
            if (end) return cb(end);
            cb(null, { value: data.value + 1 });
          });
        };
      }
    };

    const results: number[] = [];
    const sink = function (read: (abort: any, cb: (end: any, data?: any) => void) => void) {
      read(null, function (end: any, data: any) {
        if (!end) results.push(data.value);
      });
    };

    pull(source, transform, sink);

    expect(results).toEqual([3, 5]);
  });
});