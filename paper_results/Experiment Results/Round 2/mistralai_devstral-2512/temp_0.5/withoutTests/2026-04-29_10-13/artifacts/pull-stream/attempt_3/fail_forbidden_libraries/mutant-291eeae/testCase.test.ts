const log = require("../../../../../../../../../../../subject_repositories/pull-stream/sinks/log.js");
const through = require("through2");

describe("log sink", () => {
  it("should log data to console when used in a pull-stream", (done) => {
    const consoleSpy = jest.spyOn(console, 'log');
    const testData = "test data";

    const source = through.obj();
    const sink = log(() => {
      expect(consoleSpy).toHaveBeenCalledWith(testData);
      consoleSpy.mockRestore();
      done();
    });

    source.pipe(sink);
    source.write(testData);
    source.end();
  });
});