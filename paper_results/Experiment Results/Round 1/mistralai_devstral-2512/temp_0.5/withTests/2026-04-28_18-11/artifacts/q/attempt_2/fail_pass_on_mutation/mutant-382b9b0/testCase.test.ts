import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("nodeify method", () => {
  it("should call the nodeback with the resolved value", (done) => {
    const testValue = "test";
    const nodeback = (error: any, value: any) => {
      expect(error).toBeNull();
      expect(value).toBe(testValue);
      done();
    };
    Q.resolve(testValue).nodeify(nodeback);
  });
});