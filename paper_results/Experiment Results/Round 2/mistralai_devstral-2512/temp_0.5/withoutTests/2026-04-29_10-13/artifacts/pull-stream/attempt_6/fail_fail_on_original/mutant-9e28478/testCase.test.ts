const pull = require("../../../../../../../../../../../subject_repositories/pull-stream/pull.js");

describe("pull function with partial application", () => {
  it("should correctly handle partial application with two arguments", () => {
    const source = {
      source: function (read: any) {
        return function (end: any, cb: any) {
          cb(null, "data");
        };
      },
      sink: function (read: any) {
        return function (end: any, cb: any) {
          cb(null, "processed");
        };
      }
    };

    const partialSink = pull(source, function (read: any) {
      return function (end: any, cb: any) {
        read(null, function (end: any, data: any) {
          cb(null, data + " transformed");
        });
      };
    });

    const result = partialSink(function (read: any) {
      return function (end: any, cb: any) {
        read(null, function (end: any, data: any) {
          cb(null, data);
        });
      };
    });

    const mockCallback = jest.fn();
    result(null, mockCallback);

    expect(mockCallback).toHaveBeenCalledWith(null, "processed transformed");
  });
});