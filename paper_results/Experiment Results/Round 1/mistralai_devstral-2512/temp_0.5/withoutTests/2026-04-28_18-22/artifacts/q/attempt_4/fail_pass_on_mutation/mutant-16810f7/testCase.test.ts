// llm-cache/mistralai_devstral-2512/temp_0.5/withoutTests/cached/artifacts/q/attempt_1/pending_category/mutant-16810f7/testCase.test.ts
const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Q unhandled rejection tracking", () => {
  it("should track unhandled rejections when process.emit exists", (done) => {
    // Create a complete mock process object
    const mockProcess = {
      emit: jest.fn(),
      nextTick: jest.fn((cb) => setTimeout(cb, 0)),
      on: jest.fn(),
      stdout: {},
      stderr: {},
      stdin: {},
      argv: [],
      env: {},
      version: '',
      versions: {},
      arch: '',
      platform: '',
      pid: 1,
      execPath: '',
      cwd: jest.fn(),
      chdir: jest.fn(),
      umask: jest.fn(),
      uptime: jest.fn(),
      memoryUsage: jest.fn(),
      cpuUsage: jest.fn(),
      kill: jest.fn(),
      exit: jest.fn(),
      getuid: jest.fn(),
      setuid: jest.fn(),
      getgid: jest.fn(),
      setgid: jest.fn(),
      geteuid: jest.fn(),
      seteuid: jest.fn(),
      getegid: jest.fn(),
      setegid: jest.fn(),
      getgroups: jest.fn(),
      setgroups: jest.fn(),
      initgroups: jest.fn(),
      hrtime: jest.fn(),
      domain: null
    };

    // Temporarily replace global.process
    const originalProcess = global.process;
    global.process = mockProcess;

    // Reset unhandled rejection tracking
    Q.resetUnhandledRejections();

    // Create a rejected promise that won't be handled
    const rejectedPromise = Q.reject(new Error("Test error"));

    // Give time for the unhandled rejection tracking to occur
    setTimeout(() => {
      // Check that process.emit was called with unhandledRejection
      expect(mockProcess.emit).toHaveBeenCalledWith("unhandledRejection", expect.any(Error), rejectedPromise);

      // Restore original process
      global.process = originalProcess;
      done();
    }, 50);
  });
});