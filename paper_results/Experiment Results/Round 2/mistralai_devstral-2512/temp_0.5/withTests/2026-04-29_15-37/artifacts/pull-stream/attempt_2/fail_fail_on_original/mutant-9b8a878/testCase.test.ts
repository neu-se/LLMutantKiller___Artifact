const pull = require("../../../../../../../../../../../subject_repositories/pull-stream/pull.js");

describe("pull function with partial application", () => {
  it("should correctly handle multiple arguments in partial application", () => {
    const source = (abort: any, cb: (end: any, data?: any) => void) => {
      if (abort) {
        cb(abort);
      } else {
        cb(null, "data");
      }
    };

    const sink = (read: any) => {
      return (abort: any, cb: (end: any, data?: any) => void) => {
        read(abort, (end: any, data: any) => {
          if (end) {
            cb(end);
          } else {
            cb(null, data);
          }
        });
      };
    };

    const partial = pull(source, sink);
    const read = partial();

    read(null, (end: any, data: any) => {
      expect(end).toBeNull();
      expect(data).toBe("data");
    });
  });
});