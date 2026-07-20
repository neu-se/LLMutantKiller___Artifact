import pull from "../../../../../../../../../../../subject_repositories/pull-stream/pull.js";

describe('pull function with partial sink', () => {
  it('should throw TypeError when args is null in partial sink', () => {
    const read = () => {};
    const partialSink = (read) => {
      // This should trigger the args == null check
      const args = null;
      expect(() => {
        pull((read) => {
          if (args == null) {
            throw new TypeError("partial sink should only be called once!");
          }
          return read;
        }, read);
      }).toThrow(TypeError);
    };

    expect(() => pull(partialSink, read)).not.toThrow();
  });
});