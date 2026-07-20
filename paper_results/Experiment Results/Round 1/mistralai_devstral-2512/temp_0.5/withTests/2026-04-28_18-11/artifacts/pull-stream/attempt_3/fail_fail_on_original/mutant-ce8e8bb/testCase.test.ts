const pull = require("../../../../../../../../../../../subject_repositories/pull-stream/pull.js");

describe("pull function with object stream", () => {
  it("should correctly handle object streams with source method", () => {
    const mockStream = {
      source: function() {
        return function read(end, cb) {
          if (end) return cb(end);
          cb(null, "test-data");
        };
      }
    };

    const result = pull(mockStream);
    expect(typeof result).toBe("function");
    expect(result.length).toBe(2);

    // Test that the returned function works as a read function
    result(null, (end, data) => {
      expect(end).toBe(null);
      expect(data).toBe("test-data");
    });
  });
});