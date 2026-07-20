import { find } from "../../../../../../../../../../../subject_repositories/pull-stream/sinks/find.js";

describe("find function", () => {
  it("should call the callback with the correct error when the stream ends with an error", (done) => {
    const callback = jest.fn();
    const stream = {
      source: {
        drain: jest.fn((read) => {
          read(null, "data");
          read(new Error("Test error"), null);
        }),
      },
    };

    const testFunction = () => false;
    find(testFunction, (err, data) => {
      callback(err, data);
      expect(err).toBeInstanceOf(Error);
      expect(err.message).toBe("Test error");
      done();
    })(stream.source);

    expect(callback).toHaveBeenCalledTimes(1);
  });
});