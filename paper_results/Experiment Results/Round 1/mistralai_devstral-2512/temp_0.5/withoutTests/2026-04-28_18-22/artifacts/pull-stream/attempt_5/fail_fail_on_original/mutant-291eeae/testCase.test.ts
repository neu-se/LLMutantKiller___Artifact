const log = require("../../../../../../../../../../../subject_repositories/pull-stream/sinks/log.js");

describe("log sink", () => {
  it("should log data to console when called directly", () => {
    const consoleSpy = jest.spyOn(console, 'log');
    const done = jest.fn();

    // Create a mock source that calls the sink directly
    const sink = log(done);
    const mockSource = {
      read: (cb: (end: boolean, data?: any) => void) => {
        cb(false, "test data");
        cb(true); // End the stream
      }
    };

    // Simulate the drain behavior by calling the source
    const read = mockSource.read;
    let ended = false;
    read((end, data) => {
      if (!ended) {
        if (end) {
          ended = true;
          done();
        } else {
          sink(data);
        }
      }
    });

    expect(consoleSpy).toHaveBeenCalledWith("test data");
    consoleSpy.mockRestore();
  });
});