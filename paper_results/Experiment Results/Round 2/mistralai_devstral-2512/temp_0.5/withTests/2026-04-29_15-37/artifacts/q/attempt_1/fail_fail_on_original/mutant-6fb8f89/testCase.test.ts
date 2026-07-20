import { Q } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("spread method behavior", () => {
  it("should correctly apply fulfilled values to callback arguments", async () => {
    const testArray = [1, 2, 3];
    const mockCallback = jest.fn((a: number, b: number, c: number) => {
      return a + b + c;
    });

    await Q(testArray).spread(mockCallback);

    expect(mockCallback).toHaveBeenCalledWith(1, 2, 3);
    expect(mockCallback).toHaveReturnedWith(6);
  });
});