import { Q } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q.join behavior", () => {
  it("should throw an error with the correct message when values are not the same", async () => {
    const promise1 = Q.resolve(1);
    const promise2 = Q.resolve(2);

    await expect(Q.join(promise1, promise2)).rejects.toThrow(
      "Q can't join: not the same: 1 2"
    );
  });
});