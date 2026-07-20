const log = require("../../../../../../../../../../../subject_repositories/pull-stream/sinks/log.js");

describe("log sink", () => {
  it("should log data to console when used as a sink", () => {
    const consoleSpy = jest.spyOn(console, 'log');
    const done = jest.fn();
    const testData = "test data";

    const sink = log(done);
    const mockRead = (abort: any, cb: (end: any, data?: any) => void) => {
      cb(null, testData);
      cb(true); // Signal end
    };

    // Call the sink with the mock read function
    sink(null, mockRead);

    expect(consoleSpy).toHaveBeenCalledWith(testData);
    consoleSpy.mockRestore();
  });
});