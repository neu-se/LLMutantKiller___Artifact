describe("Q core functionality with object_keys intact", () => {
  it("Q.fulfill returns a fulfilled promise with correct inspect state", () => {
    const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");
    const p = Q.fulfill(42);
    const inspected = p.inspect();
    expect(inspected.state).toBe("fulfilled");
    expect(inspected.value).toBe(42);
  });
});