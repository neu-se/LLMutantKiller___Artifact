import pull from "../../../../../../../../../../../subject_repositories/pull-stream/pull.js";

describe('pull stream mutation test', () => {
  it('should handle null object in stream correctly', () => {
    const source = {
      source: function (abort: any, cb: (end: any, data?: any) => void) {
        cb(null, { value: 1 });
        cb(null, null);
        cb(null, { value: 2 });
        cb(true);
      }
    };

    const results: any[] = [];
    const sink = function (read: (abort: any, cb: (end: any, data?: any) => void) => void) {
      read(null, function (end: any, data: any) {
        if (!end) results.push(data);
      });
    };

    pull(source, sink);

    expect(results).toEqual([{ value: 1 }, null, { value: 2 }]);
  });
});