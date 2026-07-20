import { Queue } from "../../../../../../../../../../../subject_repositories/q/queue";

describe('Queue', () => {
  it('should close with the correct error message', () => {
    const queue = Queue();
    queue.close();
    return queue.get().then(() => {
      expect(true).toBe(false);
    }).catch((error) => {
      expect(error.message).toBe("Can't get value from closed queue");
    });
  });
});