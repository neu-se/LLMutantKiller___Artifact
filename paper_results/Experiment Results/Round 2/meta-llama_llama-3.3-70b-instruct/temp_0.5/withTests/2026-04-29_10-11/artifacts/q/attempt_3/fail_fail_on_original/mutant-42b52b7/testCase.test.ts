import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("q", () => {
  it("should test the behavior of the mutated file", async () => {
    const promise = Q.reject(new Error("Test error"));
    const process = { emit: jest.fn() };

    Q.onerror = (error) => {
      if (typeof process === "object" && typeof process.emit === "function") {
        process.emit("unhandledRejection", error, promise);
      }
    };

    expect(process.emit).toHaveBeenCalledTimes(0);

    Q.resetUnhandledRejections();

    expect(process.emit).toHaveBeenCalledTimes(1);
  });
});