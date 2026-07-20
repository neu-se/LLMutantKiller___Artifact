const log = require("../../../../../../../../../../../subject_repositories/pull-stream/sinks/log.js");
const pull = require("pull-stream");

describe("log sink", () => {
  it("should log data to console when used in a pull stream", () => {
    const consoleSpy = jest.spyOn(console, 'log');
    const source = pull.values(['test data']);
    const done = jest.fn();

    pull(
      source,
      log(done)
    );

    expect(consoleSpy).toHaveBeenCalledWith('test data');
    consoleSpy.mockRestore();
  });
});