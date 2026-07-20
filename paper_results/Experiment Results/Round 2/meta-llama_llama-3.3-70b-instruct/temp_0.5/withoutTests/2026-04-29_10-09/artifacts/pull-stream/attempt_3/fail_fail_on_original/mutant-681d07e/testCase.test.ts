import pull from "../../../../../../../../../../../subject_repositories/pull-stream/pull.js";

describe('pull function', () => {
  it('should not throw an error when called with a partial sink and then called again, if the condition is always false', () => {
    const partialSink = pull(function (a) {
      return function (read) {
        if (false) {
          throw new TypeError("partial sink should only be called once!");
        }
      };
    });
    expect(() => partialSink(null)).not.toThrowError("partial sink should only be called once!");
    expect(() => partialSink(null)).not.toThrowError("partial sink should only be called once!");
  });
});