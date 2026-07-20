import pull from "../../../../../../../../../../../subject_repositories/pull-stream/pull.js";

describe('pull function with object stream', () => {
  it('should process object streams correctly', () => {
    const source = {
      source: function (abort: any, cb: any) {
        cb(null, 'data');
      }
    };

    const objectStream = {
      source: function (read: any) {
        return function (abort: any, cb: any) {
          read(abort, function (end: any, data: any) {
            if (end) return cb(end);
            cb(null, data + '-processed');
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

    // The mutation changes the condition from `typeof s === 'object'` to `typeof s !== 'object'`
    // This means object streams won't be processed in the mutated version
    const result = pull(source, objectStream);

    expect(typeof result).toBe('function');

    let receivedData: any = null;
    result(null, (end: any, data: any) => {
      receivedData = data;
    });

    // In the original code, object streams are processed
    // In the mutated code, they are not
    expect(receivedData).toBe('data-processed');
  });
});