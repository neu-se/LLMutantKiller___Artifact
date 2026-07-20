const pull = require("../../../../../../../../../../../subject_repositories/pull-stream/pull.js");

describe("pull stream source handling", () => {
  it("should handle streams with source property correctly", () => {
    const sourceStream = {
      source: () => (end: any, cb: (end: any, data?: any) => void) => {
        if (end) return cb(end);
        cb(null, "test-data");
      }
    };

    const read = pull(sourceStream);
    let result: any = null;
    read(null, (end: any, data: any) => {
      result = { end, data };
    });

    // The callback is synchronous in this case
    expect(result).not.toBeNull();
    expect(result.end).toBe(null);
    expect(result.data).toBe("test-data");
  });
});