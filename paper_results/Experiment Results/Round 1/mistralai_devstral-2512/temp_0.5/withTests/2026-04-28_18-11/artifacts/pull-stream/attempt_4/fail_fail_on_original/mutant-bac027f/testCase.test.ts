const pull = require("../../../../../../../../../../../subject_repositories/pull-stream/pull.js");

describe("pull stream source handling", () => {
  it("should handle streams with source property correctly", (done) => {
    const sourceStream = {
      source: () => (end: any, cb: (end: any, data?: any) => void) => {
        if (end) return cb(end);
        cb(null, "test-data");
      }
    };

    const read = pull(sourceStream);
    read(null, (end: any, data: any) => {
      expect(end).toBe(null);
      expect(data).toBe("test-data");
      done();
    });
  });
});