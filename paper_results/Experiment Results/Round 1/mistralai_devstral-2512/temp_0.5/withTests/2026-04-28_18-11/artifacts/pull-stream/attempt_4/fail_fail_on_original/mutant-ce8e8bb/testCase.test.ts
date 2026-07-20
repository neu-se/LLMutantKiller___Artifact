const pull = require("../../../../../../../../../../../subject_repositories/pull-stream/pull.js");

describe("pull function with through stream", () => {
  it("should correctly process through streams", () => {
    const throughStream = {
      sink: jest.fn((read) => {
        return {
          source: function(end: any, cb: any) {
            read(end, (endData: any, data: any) => {
              if (endData) return cb(endData);
              cb(null, data * 2);
            });
          }
        };
      })
    };

    const source = function(end: any, cb: any) {
      if (end) return cb(end);
      cb(null, 5);
    };

    const result = pull(source, throughStream);
    expect(typeof result).toBe("function");
    expect(result.length).toBe(2);

    result(null, (end: any, data: any) => {
      expect(end).toBe(null);
      expect(data).toBe(10);
    });

    expect(throughStream.sink).toHaveBeenCalled();
  });
});