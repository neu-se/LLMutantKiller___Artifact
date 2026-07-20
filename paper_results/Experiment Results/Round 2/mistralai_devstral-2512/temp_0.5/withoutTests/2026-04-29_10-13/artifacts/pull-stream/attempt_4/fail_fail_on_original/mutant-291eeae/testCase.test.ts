const log = require("../../../../../../../../../../../subject_repositories/pull-stream/sinks/log.js");

describe("log sink", () => {
  it("should call console.log with the provided data", () => {
    const consoleSpy = jest.spyOn(console, 'log');
    const done = jest.fn();

    const sink = log(done);
    const testData = "test data";

    // Simulate the drain function calling our callback
    const drainCallback = consoleSpy.mock.calls[0][0];
    drainCallback(testData);

    expect(consoleSpy).toHaveBeenCalledWith(testData);
    consoleSpy.mockRestore();
  });
});