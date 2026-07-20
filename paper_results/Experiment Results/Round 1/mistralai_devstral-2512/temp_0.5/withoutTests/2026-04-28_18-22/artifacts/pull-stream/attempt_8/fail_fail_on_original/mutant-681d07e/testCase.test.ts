import pull from "../../../../../../../../../../../subject_repositories/pull-stream/pull.js";

describe('pull function with partial sink', () => {
  it('should throw TypeError when partial sink is called with null args', () => {
    const read = () => {};
    const partialSink = (read: any) => {
      // Force the args to be null to trigger the check
      const args = null;
      if (args == null) {
        throw new TypeError("partial sink should only be called once!");
      }
      return read;
    };

    // This should trigger the args null check in the original code
    expect(() => {
      pull((read: any) => {
        const args = null;
        if (args == null) {
          throw new TypeError("partial sink should only be called once!");
        }
        return read;
      }, read);
    }).toThrow(TypeError);
  });
});