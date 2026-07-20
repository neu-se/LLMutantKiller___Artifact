import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q.all with rejected promise", () => {
  it("should reject when one of the promises in the array is rejected", async () => {
    const resolvedPromise = Q.resolve(1);
    const rejectedPromise = Q.reject(new Error("test error"));

    let wasRejected = false;
    let rejectionReason: Error | null = null;
    let fulfilledValue: any = null;

    await new Promise<void>((resolve) => {
      Q.all([resolvedPromise, rejectedPromise]).then(
        (value: any) => {
          fulfilledValue = value;
          resolve();
        },
        (reason: Error) => {
          wasRejected = true;
          rejectionReason = reason;
          resolve();
        }
      );
    });

    expect(wasRejected).toBe(true);
    expect(rejectionReason).toBeDefined();
    expect(rejectionReason!.message).toBe("test error");
    expect(fulfilledValue).toBeNull();
  });
});