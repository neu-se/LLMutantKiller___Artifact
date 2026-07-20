import pull from "../../../../../../../../../../../subject_repositories/pull-stream/pull.js";

describe('pull stream mutation test', () => {
  it('should handle object with both source and sink methods correctly', () => {
    const source = {
      source: function (abort: any, cb: (end: any, data?: any) => void) {
        cb(null, { value: 1 });
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

    const results: any[] = [];
    const sink = function (read: (abort: any, cb: (end: any, data?: any) => void) => void) {
      read(null, function (end: any, data: any) {
        if (!end) results.push(data);
      });
    };

    pull(source, transform, sink);

    expect(results).toEqual([{ value: 3 }]);
  });
});