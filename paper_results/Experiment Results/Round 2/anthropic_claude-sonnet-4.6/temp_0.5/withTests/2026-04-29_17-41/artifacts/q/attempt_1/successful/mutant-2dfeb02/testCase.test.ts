import { Queue } from "../../../../../../../../../../../subject_repositories/q/queue.js";

const Queue = require("../../../../../../../../../../../subject_repositories/q/queue.js");

describe("Queue close with custom error", () => {
  it("should reject gets with the custom error passed to close", () => {
    const queue = Queue();
    const customError = new Error("Custom close reason");
    queue.close(customError);

    return queue.get()
      .then(() => {
        throw new Error("Expected rejection but got fulfillment");
      })
      .catch((error: any) => {
        expect(error.message).toBe("Custom close reason");
      });
  });
});