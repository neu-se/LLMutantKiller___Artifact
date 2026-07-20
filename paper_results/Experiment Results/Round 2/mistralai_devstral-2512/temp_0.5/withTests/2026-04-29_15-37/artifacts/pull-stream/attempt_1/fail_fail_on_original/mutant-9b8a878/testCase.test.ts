import { pull } from "../../../../../../../../../../../subject_repositories/pull-stream/pull.js";

describe("pull function with partial application", () => {
  it("should correctly handle multiple arguments in partial application", () => {
    const source = jest.fn((abort, cb) => {
      if (abort) {
        cb(abort);
      } else {
        cb(null, "data");
      }
    });

    const sink = jest.fn((read) => {
      return (abort, cb) => {
        read(abort, (end, data) => {
          if (end) {
            cb(end);
          } else {
            cb(null, data);
          }
        });
      };
    });

    const partial = pull(source, sink);
    const read = partial();

    read(null, (end, data) => {
      expect(end).toBeNull();
      expect(data).toBe("data");
    });

    expect(source).toHaveBeenCalled();
    expect(sink).toHaveBeenCalled();
  });
});