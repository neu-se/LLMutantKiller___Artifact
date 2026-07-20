import { pull } from "./pull.js";

describe("pull function with partial application", () => {
  it("should correctly handle partial application with two arguments", () => {
    const source = {
      source: function (read) {
        return function (end, cb) {
          cb(null, "data");
        };
      },
      sink: function (read) {
        return function (end, cb) {
          cb(null, "processed");
        };
      }
    };

    const partialSink = pull(source, function (read) {
      return function (end, cb) {
        read(null, function (end, data) {
          cb(null, data + " transformed");
        });
      };
    });

    const result = partialSink(function (read) {
      return function (end, cb) {
        read(null, function (end, data) {
          cb(null, data);
        });
      };
    });

    const mockCallback = jest.fn();
    result(null, mockCallback);

    expect(mockCallback).toHaveBeenCalledWith(null, "processed transformed");
  });
});