import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe("Q.done", () => {
  it("should call the done method on the promise", () => {
    const promise = Q.resolve();
    const fulfilled = jest.fn();
    const rejected = jest.fn();
    const progress = jest.fn();

    Q.done(promise, fulfilled, rejected, progress);

    expect(Q.done).toHaveBeenCalledTimes(1);
  });
});