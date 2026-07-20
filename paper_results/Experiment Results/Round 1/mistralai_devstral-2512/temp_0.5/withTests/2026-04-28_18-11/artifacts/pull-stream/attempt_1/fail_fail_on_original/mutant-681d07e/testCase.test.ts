import { pull } from "../../../../../../../../../../../subject_repositories/pull-stream/pull.js";

describe("pull function with partial sink", () => {
  it("should throw TypeError when partial sink is called more than once", () => {
    const partialSink = pull(function (read) {
      // This should throw when called more than once
      return read;
    });

    // First call should work
    const firstRead = function (abort, cb) {
      cb(null, "data");
    };
    const result1 = partialSink(firstRead);

    // Second call should throw TypeError
    const secondRead = function (abort, cb) {
      cb(null, "data");
    };

    expect(() => {
      partialSink(secondRead);
    }).toThrow(TypeError);
  });
});