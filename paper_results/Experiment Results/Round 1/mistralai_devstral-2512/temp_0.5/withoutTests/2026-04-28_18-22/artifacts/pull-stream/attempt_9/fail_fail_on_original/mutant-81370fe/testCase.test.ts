const pull = require("../../../../../../../../../../../subject_repositories/pull-stream/pull.js");

describe("pull function with object sink", () => {
  it("should handle object sinks with source and sink methods", () => {
    const transform = {
      source: (read: any) => {
        return () => read().toUpperCase();
      },
      sink: (read: any) => {
        return () => read().toLowerCase();
      }
    };

    const source = () => "TestData";
    const result = pull(source, transform);
    expect(typeof result).toBe('function');
    expect(result()).toBe("TESTDATA");
  });
});