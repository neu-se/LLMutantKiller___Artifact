import drain from "../../../../../../../../../../../subject_repositories/pull-stream/sinks/drain.js";

describe("drain without done callback", () => {
  it("should warn with an Error object (not undefined) when no done callback is supplied and stream errors", () => {
    const originalWarn = console.warn;
    const warnArgs: any[] = [];
    console.warn = (...args: any[]) => {
      warnArgs.push(...args);
    };

    const error = new Error("stream error");
    const source = (abort: any, cb: Function) => {
      cb(error);
    };

    const sink = drain(null, undefined);

    try {
      sink(source);
    } catch (e) {
      // expected to throw
    }

    console.warn = originalWarn;

    expect(warnArgs.length).toBeGreaterThan(0);
    expect(warnArgs[0]).toBeInstanceOf(Error);
    expect((warnArgs[0] as Error).message).toBe("no done callback supplied");
  });
});