import pull from "../../../../../../../../../../../subject_repositories/pull-stream/pull.js";

describe('pull function', () => {
  it('should not throw an error when called with a partial sink and null args if the condition is checked', () => {
    const partialSink = pull(function (read) {
      return function (read) {
        const args = null;
        if (args == null) {
          throw new TypeError("partial sink should only be called once!");
        }
      };
    });
    expect(() => partialSink(null)(null)).toThrowError("partial sink should only be called once!");
    const partialSink2 = pull(function (read) {
      return function (read) {
        const args = null;
        if (false) {
          throw new TypeError("partial sink should only be called once!");
        }
      };
    });
    expect(() => partialSink2(null)(null)).not.toThrowError("partial sink should only be called once!");
  });
});