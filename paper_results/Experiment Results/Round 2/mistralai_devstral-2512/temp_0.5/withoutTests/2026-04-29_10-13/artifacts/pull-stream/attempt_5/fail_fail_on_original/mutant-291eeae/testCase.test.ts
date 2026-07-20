const log = require("../../../../../../../../../../../subject_repositories/pull-stream/sinks/log.js");

describe("log sink", () => {
  it("should log data to console when sink is called", () => {
    const consoleSpy = jest.spyOn(console, 'log');
    const done = jest.fn();
    const testData = "test data";

    const sink = log(done);
    sink(testData);

    expect(consoleSpy).toHaveBeenCalledWith(testData);
    consoleSpy.mockRestore();
  });
});