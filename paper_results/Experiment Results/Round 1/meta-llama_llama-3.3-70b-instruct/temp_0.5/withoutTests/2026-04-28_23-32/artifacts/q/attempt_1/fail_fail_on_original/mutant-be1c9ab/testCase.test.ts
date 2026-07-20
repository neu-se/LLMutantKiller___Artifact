import { Q } from "../../../../../../../../subject_repositories/q/q";

describe("Q", () => {
  it("should handle StopIteration exceptions correctly", () => {
    class StopIteration extends Error {}
    const exception = new StopIteration();
    exception.toString = function () {
      return "[object StopIteration]";
    };

    const isStopIteration = (exception: any) => {
      return (
        Object.prototype.toString.call(exception) === "[object StopIteration]"
      );
    };

    expect(isStopIteration(exception)).toBe(true);
    expect(isStopIteration({})).toBe(false);

    const q = Q(function (resolve, reject) {
      throw exception;
    });

    q.then(
      (value) => {
        throw new Error("Should not be called");
      },
      (error) => {
        expect(error).toBe(exception);
      }
    );
  });
});