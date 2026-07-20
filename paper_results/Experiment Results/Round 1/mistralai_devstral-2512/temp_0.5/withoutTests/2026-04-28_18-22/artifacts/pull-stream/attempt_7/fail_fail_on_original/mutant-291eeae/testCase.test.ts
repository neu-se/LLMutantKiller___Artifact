const log = require("../../../../../../../../../../../subject_repositories/pull-stream/sinks/log.js");

describe("log sink", () => {
  it("should log data to console", () => {
    const consoleSpy = jest.spyOn(console, 'log');
    const done = jest.fn();

    // Create a mock source that simulates pull stream behavior
    const mockSource = {
      read: (cb: (end: boolean, data?: any) => void) => {
        cb(false, "test data");
        cb(true); // End the stream
      }
    };

    // Get the sink function
    const sink = log(done);

    // Manually trigger the drain behavior by calling the sink with the source
    let ended = false;
    const read = mockSource.read;
    read((end, data) => {
      if (!ended) {
        if (end) {
          ended = true;
          done();
        } else {
          // The sink is the drain function, so we need to call it with the data
          const drainFunc = sink;
          if (typeof drainFunc === 'function') {
            drainFunc(data);
          }
        }
      }
    });

    expect(consoleSpy).toHaveBeenCalledWith("test data");
    consoleSpy.mockRestore();
  });
});