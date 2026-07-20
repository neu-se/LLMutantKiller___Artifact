import pull from "../../../../../../../../../../../subject_repositories/pull-stream/pull.js";

describe("pull function behavior with non-function arguments", () => {
  it("should handle object streams correctly when non-function argument is provided", () => {
    const source = {
      source: function(read) {
        return function(end, cb) {
          if (end) return cb(end);
          setTimeout(() => cb(null, "data"), 0);
        };
      },
      sink: function(read) {
        read(null, "processed");
      }
    };

    const result = pull(source, { sink: () => {}, source: () => {} });
    expect(typeof result).toBe('function');
  });
});