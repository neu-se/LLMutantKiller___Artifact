import { pull } from "../../../../../../../../../../../subject_repositories/pull-stream/pull.js";

describe("pull function with source property", () => {
  it("should use source property when available", (done) => {
    const source = {
      source: jest.fn((read) => {
        return (abort, cb) => {
          if (abort) return cb(abort);
          cb(null, "test-data");
        };
      }),
    };

    const result = pull(source);

    // The result should be the source's source function
    expect(typeof result).toBe("function");
    expect(result.length).toBe(2);

    // Call the result to verify it works
    result(null, (end, data) => {
      expect(end).toBeNull();
      expect(data).toBe("test-data");
      done();
    });
  });
});