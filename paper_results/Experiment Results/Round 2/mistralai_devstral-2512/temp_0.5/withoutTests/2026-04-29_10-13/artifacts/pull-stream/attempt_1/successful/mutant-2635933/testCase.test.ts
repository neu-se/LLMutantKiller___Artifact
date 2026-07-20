import pull from "../../../../../../../../../../../subject_repositories/pull-stream/pull.js";

describe('pull function with object stream', () => {
  it('should handle object streams correctly', () => {
    const source = {
      source: function (abort, cb) {
        cb(null, { data: 'test' });
      }
    };

    const transform = {
      source: null,
      sink: function (read) {
        this.source = function (abort, cb) {
          read(abort, function (end, data) {
            if (end) return cb(end);
            cb(null, { transformed: data.data });
          });
        };
      }
    };

    const result = pull(source, transform);

    expect(typeof result).toBe('function');
    expect(result.length).toBe(2);

    result(null, function (end, data) {
      expect(end).toBeNull();
      expect(data).toEqual({ transformed: 'test' });
    });
  });
});