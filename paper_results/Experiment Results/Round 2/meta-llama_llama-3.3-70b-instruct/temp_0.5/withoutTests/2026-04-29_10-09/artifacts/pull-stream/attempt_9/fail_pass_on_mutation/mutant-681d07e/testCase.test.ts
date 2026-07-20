import pull from "../../../../../../../../../../../subject_repositories/pull-stream/pull.js";

describe('pull function', () => {
  it('should throw an error when called with a partial sink and args is checked', () => {
    const partialSink = pull(function (a) {
      return function (read) {
        var args = a;
        if (args == null) {
          throw new TypeError("partial sink should only be called once!");
        }
      };
    });
    expect(() => partialSink(null)(null)).toThrowError("partial sink should only be called once!");
  });
});