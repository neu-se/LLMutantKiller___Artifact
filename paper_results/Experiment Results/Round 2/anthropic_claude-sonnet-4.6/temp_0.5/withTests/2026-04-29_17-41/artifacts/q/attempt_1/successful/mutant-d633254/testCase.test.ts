import { Queue } from "../../../../../../../../../../../subject_repositories/q/queue.js";

const Queue_ = require("../../../../../../../../../../../subject_repositories/q/queue.js");

describe("Queue close without error argument", () => {
  it("should use the default error message 'Can't get value from closed queue' when closed without an error argument", async () => {
    const queue = Queue_();
    queue.close();

    let caughtError: Error | null = null;
    try {
      await queue.get();
    } catch (error) {
      caughtError = error as Error;
    }

    expect(caughtError).not.toBeNull();
    expect(caughtError!.message).toBe("Can't get value from closed queue");
  });
});