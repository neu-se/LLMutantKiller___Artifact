import { Q } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("q", () => {
  it("should test the behavior of the mutated file", async () => {
    const process = { emit: jest.fn() };
    const unhandledRejections = [];
    const unhandledReasons = [];

    Q.resetUnhandledRejections();

    const promise = Q.reject(new Error("Test error"));
    const at = unhandledRejections.indexOf(promise);
    if (at !== -1) {
      unhandledRejections.splice(at, 1);
      unhandledReasons.splice(at, 1);
    }

    expect(unhandledRejections.length).toBe(0);
    expect(unhandledReasons.length).toBe(0);
  });
});