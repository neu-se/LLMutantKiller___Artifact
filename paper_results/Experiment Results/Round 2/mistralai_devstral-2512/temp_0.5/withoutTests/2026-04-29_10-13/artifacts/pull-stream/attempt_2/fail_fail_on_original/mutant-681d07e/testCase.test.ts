import pull from "../../../../../../../../../../../subject_repositories/pull-stream/pull.js";

describe('pull function with partial sink', () => {
  it('should throw TypeError when args is null in partial sink', () => {
    const read = (end: any, cb: any) => {
      if (end) return cb(end);
      cb(null, 'data');
    };

    const partialSink = (read: any) => {
      const args = null;
      if (args == null) {
        throw new TypeError("partial sink should only be called once!");
      }
    };

    expect(() => {
      pull(partialSink, read);
    }).toThrow(TypeError);
  });
});