import { Q } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("async function with SpiderMonkey-style generators", () => {
  it("should handle StopIteration exception correctly", () => {
    // Simulate a SpiderMonkey-style generator that throws StopIteration when done
    const generatorFunction = function* () {
      yield 1;
      yield 2;
      return "done";
    };

    // Create a mock generator that mimics SpiderMonkey behavior
    const mockGenerator = {
      next: generatorFunction().next.bind(generatorFunction()),
      "throw": function (exception) {
        if (exception instanceof StopIteration) {
          return { done: true, value: exception.value };
        }
        throw exception;
      }
    };

    // Define StopIteration for the test environment
    function StopIteration(value: any) {
      this.value = value;
    }
    (StopIteration as any).prototype = new Error();

    // Test the async function with the mock generator
    const asyncFunc = Q.async(function () {
      return mockGenerator;
    });

    return asyncFunc().then(
      (result) => {
        expect(result).toBe("done");
      },
      (error) => {
        throw new Error(`Test failed: ${error}`);
      }
    );
  });
});