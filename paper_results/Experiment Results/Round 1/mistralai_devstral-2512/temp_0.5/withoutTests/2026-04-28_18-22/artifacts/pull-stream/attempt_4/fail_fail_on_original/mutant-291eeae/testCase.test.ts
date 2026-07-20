const log = require("../../../../../../../../../../../subject_repositories/pull-stream/sinks/log.js");

describe("log sink", () => {
  it("should log data to console when data is passed", () => {
    const consoleSpy = jest.spyOn(console, 'log');
    const done = jest.fn();
    const mockSink = {
      write: (data: any) => {
        // Simulate the sink behavior
        if (typeof log === 'function') {
          const sink = log(done);
          if (sink && typeof sink === 'function') {
            sink(data);
          }
        }
      },
      end: () => {}
    };

    mockSink.write("test data");
    mockSink.end();

    expect(consoleSpy).toHaveBeenCalledWith("test data");
    consoleSpy.mockRestore();
  });
});