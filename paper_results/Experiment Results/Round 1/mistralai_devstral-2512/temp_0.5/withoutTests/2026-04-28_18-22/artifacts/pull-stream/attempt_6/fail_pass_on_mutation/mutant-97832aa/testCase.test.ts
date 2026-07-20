import pull from "../../../../../../../../../../../subject_repositories/pull-stream/pull.js";

describe('pull stream mutation test', () => {
  it('should handle false value in stream correctly', () => {
    const source = {
      source: function (abort: any, cb: (end: any, data?: any) => void) {
        cb(null, false);
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

    expect(results).toEqual([false]);
  });
});