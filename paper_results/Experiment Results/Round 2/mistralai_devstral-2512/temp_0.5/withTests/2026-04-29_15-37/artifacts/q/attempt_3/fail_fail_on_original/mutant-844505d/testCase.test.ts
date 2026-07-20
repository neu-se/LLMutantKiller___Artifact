// llm-cache/mistralai_devstral-2512/temp_0.5/withTests/cached/artifacts/q/attempt_3/pending_category/mutant-844505d/testCase.test.ts
import * as Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("done method with domain support", () => {
  it("should use process.domain when available", () => {
    // This test verifies that the done method correctly uses process.domain
    // when it exists. The mutation changes the condition from checking
    // process.domain to always false, which would break domain error handling.

    // Mock process.domain
    const mockDomain = {
      bind: jest.fn((fn) => fn)
    };

    // Mock global process with nextTick
    const originalProcess = global.process;
    (global as any).process = {
      domain: mockDomain,
      nextTick: (fn) => fn()
    };

    const error = new Error("test error");
    const onErrorSpy = jest.fn();

    // Access Q's onerror through the module's default export
    const qModule = require("../../../../../../../../../../../subject_repositories/q/q.js");
    qModule.onerror = onErrorSpy;

    // Create a rejected promise and call done on it
    const promise = Q.reject(error);
    promise.done();

    // Restore original process
    (global as any).process = originalProcess;

    // The error should have been handled by the domain's bind
    expect(mockDomain.bind).toHaveBeenCalled();
    expect(onErrorSpy).toHaveBeenCalledWith(error);
  });
});