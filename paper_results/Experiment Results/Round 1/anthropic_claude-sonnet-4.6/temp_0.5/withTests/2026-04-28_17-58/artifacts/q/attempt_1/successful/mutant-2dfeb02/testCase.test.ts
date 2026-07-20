import { Queue } from "../../../../../../../../../../../subject_repositories/q/queue.js";

const Queue = require("../../../../../../../../../../../subject_repositories/q/queue.js");

describe("Queue close behavior", () => {
  it("should reject with the default error message when closed without an argument", () => {
    const queue = Queue();
    queue.close();

    return queue.get().then(
      () => {
        throw new Error("Expected rejection but got fulfillment");
      },
      (error: any) => {
        expect(error).toBeInstanceOf(Error);
        expect(error.message).toBe("Can't get value from closed queue");
      }
    );
  });
});