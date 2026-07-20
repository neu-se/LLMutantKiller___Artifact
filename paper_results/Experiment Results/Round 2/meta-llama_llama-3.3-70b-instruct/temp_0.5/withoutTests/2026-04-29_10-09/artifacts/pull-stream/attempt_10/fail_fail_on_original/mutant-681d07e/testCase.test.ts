import pull from "../../../../../../../../../../../subject_repositories/pull-stream/pull.js";

describe('pull function', () => {
  it('should check for null args in the partial sink', () => {
    const partialSink = pull(function (a) {
      return function (read) {
        var args = a;
        if (args !== null) {
          throw new Error("args should be null");
        }
      };
    });
    expect(() => partialSink(null)(null)).toThrowError("args should be null");
  });
});