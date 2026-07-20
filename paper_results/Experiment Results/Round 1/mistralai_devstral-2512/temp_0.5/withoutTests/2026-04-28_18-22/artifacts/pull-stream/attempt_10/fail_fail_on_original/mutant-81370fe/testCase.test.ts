const pull = require("../../../../../../../../../../../subject_repositories/pull-stream/pull.js");

describe("pull function with object sink", () => {
  it("should call the source method of object sinks", () => {
    let sourceCalled = false;
    const transform = {
      source: (read: any) => {
        sourceCalled = true;
        return () => read().toUpperCase();
      },
      sink: (read: any) => {
        return () => read().toLowerCase();
      }
    };

    const source = () => "TestData";
    pull(source, transform);
    expect(sourceCalled).toBe(true);
  });
});