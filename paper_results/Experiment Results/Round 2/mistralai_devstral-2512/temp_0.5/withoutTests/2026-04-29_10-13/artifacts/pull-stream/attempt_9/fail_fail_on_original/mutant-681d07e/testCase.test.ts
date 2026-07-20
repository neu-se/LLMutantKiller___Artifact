import pull from "../../../../../../../../../../../subject_repositories/pull-stream/pull.js";

describe('pull function with partial sink', () => {
  it('should throw when args is null in partial sink path', () => {
    const partialSink = function(read: any) {
      const args = null;
      if (args == null) {
        throw new TypeError("partial sink should only be called once!");
      }
      return (end: any, data: any) => {};
    };

    expect(() => {
      pull(partialSink);
    }).toThrow(TypeError);
  });
});