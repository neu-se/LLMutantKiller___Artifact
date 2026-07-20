import { log } from "../../../../../../../../../../../subject_repositories/pull-stream/sinks/log.js"

describe("log sink", () => {
  it("should call console.log with each data item", () => {
    const originalConsoleLog = console.log;
    const loggedValues: unknown[] = [];
    console.log = (value: unknown) => {
      loggedValues.push(value);
    };

    try {
      const pull = require("../../../../../../../../../../../subject_repositories/pull-stream/index.js");
      
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