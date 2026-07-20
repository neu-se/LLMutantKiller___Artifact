const pull = require("../../../../../../../../../../../subject_repositories/pull-stream/pull.js");

describe("pull function with source property", () => {
  it("should use source property when available", () => {
    const source = {
      source: (read: any) => {
        return (abort: any, cb: any) => {
          if (abort) return cb(abort);
          cb(null, "test-data");
        };
      },
    };

    const result = pull(source);

    // The result should be a function
    expect(typeof result).toBe("function");

    // Verify the source property was used by checking if result is a function
    // that behaves like the source function
    let callbackCalled = false;
    result(null, (end: any, data: any) => {
      callbackCalled = true;
      expect(end).toBeNull();
      expect(data).toBe("test-data");
    });

    expect(callbackCalled).toBe(true);
  });
});