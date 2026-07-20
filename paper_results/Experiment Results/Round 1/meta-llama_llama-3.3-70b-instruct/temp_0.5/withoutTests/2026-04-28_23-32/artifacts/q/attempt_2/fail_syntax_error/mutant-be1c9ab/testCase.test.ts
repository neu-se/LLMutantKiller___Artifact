import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe("Q", () => {
  it("should handle StopIteration exceptions correctly", () => {
    class StopIteration extends Error {}
    const exception1 = new StopIteration();
    const exception2 = new Error();

    Object.prototype.toString.call(exception1, () = "[object StopIteration]");

    const isStopIteration = (exception: any) => {
      return (
        Object.prototype.toString.call(exception) === "[object StopIteration]" ||
        exception instanceof Q.QReturnValue
      );
    };

    expect(isStopIteration(exception1)).toBe(true);
    expect(isStopIteration(exception2)).toBe(false);

    const q1 = Q(function (resolve: (value: any) => void, reject: (reason: any) => void) {
      throw exception1;
    });

    q1.then(
      (value: any) => {
        throw new Error("Should not be called");
      },
      (error: any) => {
        expect(error).toBe(exception1);
      }
    );

    const q2 = Q(function (resolve: (value: any) => void, reject: (reason: any) => void) {
      throw exception2;
    });

    q2.then(
      (value: any) => {
        throw new Error("Should not be called");
      },
      (error: any) => {
        expect(error).toBe(exception2);
      }
    );
  });
});