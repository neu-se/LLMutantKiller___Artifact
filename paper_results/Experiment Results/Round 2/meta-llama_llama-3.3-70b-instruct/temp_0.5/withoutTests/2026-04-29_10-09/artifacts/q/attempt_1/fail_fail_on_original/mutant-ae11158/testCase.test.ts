import { Q } from "../../../../../../../../subject_repositories/q/q";

describe("Q.nfapply", () => {
  it("should call the callback with the provided arguments", () => {
    const callback = jest.fn();
    Q.nfapply(callback, [1, 2, 3]);
    expect(callback).toHaveBeenCalledTimes(1);
    expect(callback).toHaveBeenCalledWith(1, 2, 3);
  });
});