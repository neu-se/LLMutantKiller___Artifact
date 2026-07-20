import { Q } from "./q";

describe("unhandled rejection tracking", () => {
  it("should emit rejectionHandled event when a rejected promise is handled", (done) => {
    const processMock = {
      emit: jest.fn(),
    };

    // Mock global process object
    (global as any).process = processMock;

    const deferred = Q.defer();
    const promise = deferred.promise;

    // Reject the promise first
    deferred.reject(new Error("test error"));

    // Handle the rejection after a delay to ensure it's tracked
    setTimeout(() => {
      promise.catch(() => {
        // Wait for the next tick to allow the event to be emitted
        setTimeout(() => {
          expect(processMock.emit).toHaveBeenCalledWith(
            "rejectionHandled",
            expect.any(String),
            promise
          );
          done();
        }, 10);
      });
    }, 10);
  });
});