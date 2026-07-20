import { reduce } from "./sinks/reduce.js";

describe("reduce sink with immediate end", () => {
  it("should call callback with null when source ends immediately with true", (done) => {
    const reducer = jest.fn((acc, data) => data);
    const source = jest.fn((end, cb) => {
      cb(true, null);
    });

    reduce(reducer, (err, result) => {
      expect(err).toBeNull();
      expect(result).toBeNull();
      done();
    })(source);
  });
});