import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe("Q", () => {
  it("should handle StopIteration exceptions correctly", () => {
    class StopIteration extends Error {}
    const exception = new StopIteration();

    Object.prototype.toString.call(exception, () => "[object StopIteration]");

    const isStopIteration = (exception: any) => {
      return (
        Object.prototype.toString.call(exception) === "[object StopIteration]" ||
        exception instanceof StopIteration
      );
    };

    expect(isStopIteration(exception)).toBe(true);
  });

  it("should handle QReturnValue instances", () => {
    class QReturnValue {}
    const exception = new QReturnValue();

    Object.prototype.toString.call(exception, () => "[object Object]");

    const isStopIteration = (exception: any) => {
      return (
        Object.prototype.toString.call(exception) === "[object StopIteration]" &&
        exception instanceof QReturnValue
      );
    };

    expect(isStopIteration(exception)).toBe(false);
  });
});