const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Q stack trace filtering", () => {
  it("should correctly filter internal stack frames", () => {
    const error = new Error("test");
    const promise = Q.defer().promise;
    promise.stack = "Error: test\n    at test.js:10:5\n    at q.js:100:15";
    Q.makeStackTraceLong(error, promise);
    expect(error.stack).toContain("test.js:10:5");
    expect(error.stack).not.toContain("q.js:100:15");
  });
});