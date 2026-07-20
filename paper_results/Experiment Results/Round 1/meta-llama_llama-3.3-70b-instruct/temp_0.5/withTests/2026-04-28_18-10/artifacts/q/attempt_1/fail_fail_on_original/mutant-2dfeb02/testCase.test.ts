import { Queue } from "../../../../../../../../../../../subject_repositories/q/queue";

describe('Queue', () => {
  it('should throw an error when closed with a non-error value', () => {
    const queue = new Queue();
    expect(() => queue.close(true)).toThrowError();
  });
});