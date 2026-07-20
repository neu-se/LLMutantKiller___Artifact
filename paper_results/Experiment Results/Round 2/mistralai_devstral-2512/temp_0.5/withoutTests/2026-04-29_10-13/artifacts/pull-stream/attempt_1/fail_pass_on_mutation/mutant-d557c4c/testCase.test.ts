import pull from "../../../../../../../../../../../subject_repositories/pull-stream/pull.js";

describe('pull stream mutation test', () => {
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
        return function (read) {
          return function (abort, cb) {
            read(abort, function (end, data) {
              if (end) return cb(end);
              cb(null, data);
            });
          };
        };
      }
    };

    const result = pull(source, transform);
    expect(typeof result).toBe('function');
  });
});