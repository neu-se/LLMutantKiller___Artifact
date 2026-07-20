import { describe, it, expect } from "@jest/globals";

describe("Q nextTick initialization", () => {
  it("loads safely when process is undefined", () => {
    const savedProcess = global.process;
    let loadError: Error | null = null;

    jest.resetModules();

    try {
      (global as any).process = undefined;
      jest.isolateModules(() => {
        try {
          require("../../../../../../../../../../../subject_repositories/q/q.js");
        } catch (e: any) {
          loadError = e;
        }
      });
    } finally {
      (global as any).process = savedProcess;
    }

    expect(loadError).toBeNull();
  });
});