import { Queue } from "../../../../../../../../../../../subject_repositories/q/queue";

describe('queue', () => {
  it('should throw an error with a meaningful message when trying to get from a closed queue', () => {
    const queue = new Queue();
    queue.close();
    return queue.get().then(() => {
      expect(true).toBe(false);
    }, (error) => {
      expect(error.message).toBe("Can't get value from closed queue");
    });
  });
});