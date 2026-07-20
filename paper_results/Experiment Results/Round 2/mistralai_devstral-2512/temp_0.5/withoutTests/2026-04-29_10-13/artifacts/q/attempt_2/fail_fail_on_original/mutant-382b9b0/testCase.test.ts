import { Q } from "../../../../../../../../../../../subject_repositories/q/q";

describe("Q.nodeify", () => {
  it("should call the nodeback with the resolved value when provided", (done) => {
    const expectedValue = "test";
    const promise = Q.resolve(expectedValue);

    promise.nodeify((error: any, value: any) => {
      expect(error).toBeNull();
      expect(value).toBe(expectedValue);
      done();
    });
  });
});