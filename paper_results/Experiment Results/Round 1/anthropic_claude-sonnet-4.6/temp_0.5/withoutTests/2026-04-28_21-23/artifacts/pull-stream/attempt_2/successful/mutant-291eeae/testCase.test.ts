const log = require("../../../../../../../../../../../subject_repositories/pull-stream/sinks/log.js");
const pull = require("../../../../../../../../../../../subject_repositories/pull-stream/index.js");

describe("log sink", () => {
  it("should call console.log with each data item from the stream", () => {
    const originalConsoleLog = console.log;
    const loggedValues: any[] = [];
    console.log = (value: any) => {
      loggedValues.push(value);
    };

    try {
      pull(
        pull.values([1, 2, 3]),
        log()
      );

      expect(loggedValues).toEqual([1, 2, 3]);
    } finally {
      console.log = originalConsoleLog;
    }
  });
});