import { Q } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("unhandled rejection tracking", () => {
  it("should not emit rejectionHandled event when process is not an object but has emit function", () => {
    const originalProcess = global.process;
    const mockProcess = {
      emit: jest.fn()
    };

    global.process = mockProcess as any;

    const deferred = Q.defer();
    const promise = deferred.promise;

    // Simulate a rejection being tracked
    Q.getUnhandledReasons().push("(no stack) test reason");
    Q.getUnhandledReasons().push("(no stack) test reason");

    // Now try to untrack it
    const at = 0;
    Q.getUnhandledReasons().splice(at, 1);

    // The mutation would incorrectly trigger the event emission
    // because it uses OR instead of AND in the condition
    expect(mockProcess.emit).not.toHaveBeenCalled();

    global.process = originalProcess;
  });
});