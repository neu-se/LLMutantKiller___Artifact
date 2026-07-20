const log = require("../../../../../../../../../../../subject_repositories/pull-stream/sinks/log.js");

describe("log sink", () => {
  it("should log data to console", () => {
    const consoleSpy = jest.spyOn(console, 'log');
    const done = jest.fn();

    const sink = log(done);
    sink.write("test data");
    sink.end();

    expect(consoleSpy).toHaveBeenCalledWith("test data");
    consoleSpy.mockRestore();
  });
});