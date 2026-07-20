import { Q } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q.done behavior", () => {
  it("should handle fulfilled promise with callback", (done) => {
    let fulfilledCalled = false;
    let rejectedCalled = false;

    Q.resolve("test").done(
      (value: any) => {
        fulfilledCalled = true;
        expect(value).toBe("test");
      },
      (error: any) => {
        rejectedCalled = true;
      }
    );

    // Use setTimeout to allow the promise to resolve
    setTimeout(() => {
      expect(fulfilledCalled).toBe(true);
      expect(rejectedCalled).toBe(false);
      done();
    }, 10);
  });
});