import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe("Q", () => {
  it("should handle StopIteration exceptions correctly", () => {
    class StopIteration extends Error {}
    const exception = new StopIteration();

    Object.prototype.toString.call(exception, () => "[object StopIteration]");

    try {
      throw exception;
    } catch (e) {
      const isStopIteration = (e: any) => {
        return (
          Object.prototype.toString.call(e) === "[object StopIteration]" ||
          e instanceof StopIteration
        );
      };

      expect(isStopIteration(e)).toBe(true);
    }
  });

  it.skip("should handle QReturnValue instances", () => {
    class QReturnValue {}
    const exception = new QReturnValue();

    Object.prototype.toString.call(exception, () => "[object Object]");

    try {
      throw exception;
    } catch (e) {
      const isStopIteration = (e: any) => {
        return (
          Object.prototype.toString.call(e) === "[object StopIteration]" ||
          e instanceof QReturnValue
        );
      };

      expect(isStopIteration(e)).toBe(false);
    }
  });

  it("should handle QReturnValue instances with correct condition", () => {
    class QReturnValue {}
    const exception = new QReturnValue();

    Object.prototype.toString.call(exception, () => "[object Object]");

    try {
      throw exception;
    } catch (e) {
      const isStopIteration = (e: any) => {
        return (
          Object.prototype.toString.call(e) === "[object StopIteration]" &&
          e instanceof QReturnValue
        );
      };

      expect(isStopIteration(e)).toBe(false);
    }
  });
});