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
    let receivedEnd: any = null;

    // Call the result function to trigger the stream
    result(null, (end: any, data: any) => {
      receivedEnd = end;
      receivedData = data;
    });

    // The mutation changes the condition from `typeof s === 'object'` to `typeof s !== 'object'`
    // This should cause the object stream to not be processed correctly in the mutated version
    // We need to verify that the object stream was actually processed
    expect(receivedEnd).toBeNull();
    expect(receivedData).toEqual({ data: 'test', processed: true });
  });
});