import { Q } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q unhandled rejection tracking", () => {
  it("should emit 'rejectionHandled' event when a rejected promise is handled", (done) => {
    const mockProcess = {
      emit: jest.fn(),
      on: jest.fn(),
      listeners: jest.fn(),
    };

    // Mock global process object
    (global as any).process = mockProcess;

    let rejectionHandledListener: any = null;
    mockProcess.on.mockImplementation((event: string, listener: any) => {
      if (event === "rejectionHandled") {
        rejectionHandledListener = listener;
      }
    });

    // Create a rejected promise and then handle it
    const rejectedPromise = Q.reject(new Error("test error"));
    const handledPromise = rejectedPromise.catch(() => {});

    // Simulate the async handling of the rejection
    setTimeout(() => {
      // Check that rejectionHandled event was emitted
      expect(mockProcess.emit).toHaveBeenCalledWith(
        "rejectionHandled",
        expect.any(String),
        expect.any(Object)
      );

      // Clean up
      delete (global as any).process;
      done();
    }, 50);
  });
});