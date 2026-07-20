const pull = require("../../../../../../../../../../../subject_repositories/pull-stream/pull.js");

describe("pull function with partial application", () => {
  it("should correctly handle partial application with two arguments", () => {
    const source = {
      source: function (read: any) {
        return function (end: any, cb: any) {
          cb(null, "data");
        };
      }
    };

    const sink1 = function (read: any) {
      return function (end: any, cb: any) {
        read(null, function (end: any, data: any) {
          cb(null, data + " first");
        });
      };
    };

    const sink2 = function (read: any) {
      return function (end: any, cb: any) {
        read(null, function (end: any, data: any) {
          cb(null, data + " second");
        });
      };
    };

    const partialSink = pull(source, sink1, sink2);
    const result = partialSink(function (read: any) {
      return function (end: any, cb: any) {
        read(null, function (end: any, data: any) {
          cb(null, data);
        });
      };
    });

    const mockCallback = jest.fn();
    result(null, mockCallback);

    expect(mockCallback).toHaveBeenCalledWith(null, "data first second");
  });
});