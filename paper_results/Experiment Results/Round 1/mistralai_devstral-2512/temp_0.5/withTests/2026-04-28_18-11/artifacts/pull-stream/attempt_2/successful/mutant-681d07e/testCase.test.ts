import pull from "../../../../../../../../../../../subject_repositories/pull-stream/pull.js";

describe("pull function with partial sink", () => {
  it("should throw TypeError when partial sink is called more than once", () => {
    const partialSink = pull(function (read: any) {
      return read;
    });

    const firstRead = function (abort: any, cb: any) {
      cb(null, "data");
    };
    const result1 = partialSink(firstRead);

    const secondRead = function (abort: any, cb: any) {
      cb(null, "data");
    };

    expect(() => {
      partialSink(secondRead);
    }).toThrow("partial sink should only be called once!");
  });
});