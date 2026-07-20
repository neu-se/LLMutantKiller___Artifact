import pull from "../../../../../../../../../../../subject_repositories/pull-stream/index.js"

describe("log sink", () => {
  it("should call console.log with each data item passing through the stream", () => {
    const originalConsoleLog = console.log;
    const loggedValues: unknown[] = [];
    console.log = (value: unknown) => {
      loggedValues.push(value);
    };

    try {
      pull(
        pull.values([1, 2, 3]),
        pull.log()
      );

      expect(loggedValues).toEqual([1, 2, 3]);
    } finally {
      console.log = originalConsoleLog;
    }
  });
});