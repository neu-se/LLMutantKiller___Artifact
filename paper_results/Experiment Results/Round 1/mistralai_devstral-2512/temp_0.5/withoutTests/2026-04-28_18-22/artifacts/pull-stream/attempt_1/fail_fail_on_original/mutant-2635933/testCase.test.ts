import pull from "../../../../../../../../../../../subject_repositories/pull-stream/pull.js";

describe('pull function with object stream', () => {
  it('should handle object streams correctly', () => {
    const source = {
      source: function (abort, cb) {
        cb(null, { data: 'test' });
      }
    };

    const transform = {
      source: function (read) {
        return function (abort, cb) {
          read(abort, function (end, data) {
            if (end) return cb(end);
            cb(null, { ...data, processed: true });
          });
        };
      },
      sink: function (read) {
        return function (read2) {
          return function (abort, cb) {
            read(abort, function (end, data) {
              if (end) return cb(end);
              read2(abort, function (end2, data2) {
                cb(end2, data2);
              });
            });
          };
        };
      }
    };

    const result = pull(source, transform);

    expect(typeof result).toBe('function');
    expect(result.length).toBe(2);

    result(null, (end, data) => {
      expect(end).toBeNull();
      expect(data).toEqual({ data: 'test', processed: true });
    });
  });
});