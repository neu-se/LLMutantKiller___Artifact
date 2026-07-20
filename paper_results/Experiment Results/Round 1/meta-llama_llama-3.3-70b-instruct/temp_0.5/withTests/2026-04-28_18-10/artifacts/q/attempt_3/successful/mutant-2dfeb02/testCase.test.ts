import Queue = require("../../../../../../../../../../../subject_repositories/q/queue");

describe('Queue', () => {
  it('should close with the correct error message', () => {
    const queue = Queue();
    queue.close(new Error("Test error"));
    return queue.get().then(() => {
      expect(true).toBe(false);
    }).catch((error: any) => {
      expect(error.message).toBe("Test error");
    });
  });
});