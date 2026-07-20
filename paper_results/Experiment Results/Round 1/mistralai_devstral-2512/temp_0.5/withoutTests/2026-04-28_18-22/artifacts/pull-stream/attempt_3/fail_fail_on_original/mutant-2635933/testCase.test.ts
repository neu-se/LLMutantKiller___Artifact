import pull from "../../../../../../../../../../../subject_repositories/pull-stream/pull.js";

describe('pull function with object stream', () => {
  it('should handle object streams correctly', () => {
    const source = {
      source: function (abort: any, cb: any) {
        cb(null, { data: 'test' });
      }
    };

    const objectStream = {
      source: function (read: any) {
        return function (abort: any, cb: any) {
          read(abort, function (end: any, data: any) {
            if (end) return cb(end);
            cb(null, { ...data, processed: true });
          });
        };
      },
      sink: function (read: any) {
        return function (read2: any) {
          return function (abort: any, cb: any) {
            read(abort, function (end: any, data: any) {
              if (end) return cb(end);
              read2(abort, function (end2: any, data2: any) {
                cb(end2, data2);
              });
            });
          };
        };
      }
    };

    const result = pull(source, objectStream);

    expect(typeof result).toBe('function');

    let receivedData: any = null;
    result(null, (end: any, data: any) => {
      receivedData = data;
    });

    expect(receivedData).toEqual({ data: 'test', processed: true });
  });
});