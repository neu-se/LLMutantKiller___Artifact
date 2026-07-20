const pull = require("../../../../../../../../../../../subject_repositories/pull-stream/pull.js");

describe("pull function with mixed arguments", () => {
  it("should correctly process a function followed by an object", () => {
    const mockFunction = (data: any) => data * 2;
    const mockObject = {
      sink: jest.fn((read: any) => ({
        source: function(end: any, cb: any) {
          read(end, (endData: any, data: any) => {
            if (endData) return cb(endData);
            cb(null, data + 1);
          });
        }
      }))
    };

    const source = function(end: any, cb: any) {
      if (end) return cb(end);
      cb(null, 5);
    };

    const result = pull(source, mockFunction, mockObject);
    expect(typeof result).toBe("function");
    expect(result.length).toBe(2);

    result(null, (end: any, data: any) => {
      expect(end).toBe(null);
      expect(data).toBe(11); // (5 * 2) + 1
    });

    expect(mockObject.sink).toHaveBeenCalled();
  });
});