import { Queue } from "../../../../../../../../../../../subject_repositories/q/queue.js";

const Queue_ = require("../../../../../../../../../../../subject_repositories/q/queue.js");

describe("Queue get returns the head value", () => {
  it("should resolve with the value put into the queue, not undefined", async () => {
    const queue = Queue_();
    queue.put(42);
    const value = await queue.get();
    expect(value).toBe(42);
  });
});