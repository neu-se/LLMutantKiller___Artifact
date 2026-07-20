const pull = require("../../../../../../../../../../../subject_repositories/pull-stream/pull.js");

describe("pull function with source property", () => {
  it("should use source property when available", () => {
    const mockSource = {
      source: (read: any) => {
        return (abort: any, cb: any) => {
          cb(null, "from-source");
        };
      }
    };

    // Create a read function that has a source property
    const readWithSource = Object.assign(
      (abort: any, cb: any) => {
        cb(null, "direct-read");
      },
      { source: mockSource.source }
    );

    const result = pull(readWithSource);

    // The result should be a function
    expect(typeof result).toBe("function");

    // Call the result and verify it uses the source property
    let receivedData: any = null;
    result(null, (end: any, data: any) => {
      receivedData = data;
    });

    // In original code, this should be "from-source" (using source property)
    // In mutated code, this will be "direct-read" (not using source property)
    expect(receivedData).toBe("from-source");
  });
});