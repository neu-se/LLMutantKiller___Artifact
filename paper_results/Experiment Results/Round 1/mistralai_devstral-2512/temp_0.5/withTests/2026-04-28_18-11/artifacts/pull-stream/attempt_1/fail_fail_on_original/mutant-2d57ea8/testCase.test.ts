import { pull } from "../../../../../../../../../../../subject_repositories/pull-stream/pull.js";

describe("pull function error message validation", () => {
  it("should throw TypeError with descriptive message when partial sink is called multiple times", () => {
    const partialSink = pull(function (read: any) {
      // First call should work
      const firstResult = read(null, () => {});
      // Second call should throw
      expect(() => read(null, () => {})).toThrow(TypeError);
      expect(() => read(null, () => {})).toThrow("partial sink should only be called once!");
    });

    // Execute the partial sink to trigger the error
    const read = () => {};
    expect(() => partialSink(read)).toThrow(TypeError);
    expect(() => partialSink(read)).toThrow("partial sink should only be called once!");
  });
});