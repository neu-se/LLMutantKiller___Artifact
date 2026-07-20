const Queue = require("../../../../../../../../../subject_repositories/q/queue");

describe('queue', () => {
  it('should throw an error with a meaningful message when trying to get from a closed queue', () => {
    const queue = Queue();
    queue.close();
    return queue.get().then(() => {
      expect(true).toBe(false);
    }, (error: any) => {
      expect(error.message).not.toBe("");
    });
  });
});