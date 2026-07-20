const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Q library mutation test", () => {
  it("should correctly identify StopIteration exceptions", () => {
    // Create a mock StopIteration exception
    const stopIterationException = {
      toString: () => "[object StopIteration]"
    };

    // Access the internal isStopIteration function through Q's async functionality
    // which uses it internally
    let testPassed = false;
    let testFailed = false;

    try {
      // Create a generator that throws StopIteration
      const generator = function*() {
        throw stopIterationException;
        yield "should not reach here";
      };

      // Use Q.async to test the behavior
      const asyncGenerator = Q.async(generator);

      // Execute the async generator
      asyncGenerator().then(
        () => {
          // If we get here, the StopIteration was not caught properly
          testFailed = true;
        },
        (error) => {
          // If we get the StopIteration error, it was not handled
          if (error === stopIterationException) {
            testFailed = true;
          } else {
            // Other errors might be expected
            testPassed = true;
          }
        }
      );
    } catch (e) {
      // If we get here, the mutation might be affecting behavior
      testPassed = true;
    }

    // Test with a regular error to ensure proper behavior
    const regularError = new Error("test");
    try {
      const generator2 = function*() {
        throw regularError;
        yield "should not reach here";
      };

      const asyncGenerator2 = Q.async(generator2);
      asyncGenerator2().then(
        () => {
          testFailed = true;
        },
        (error) => {
          if (error === regularError) {
            testPassed = testPassed && true;
          } else {
            testFailed = true;
          }
        }
      );
    } catch (e) {
      testFailed = true;
    }

    expect(testPassed).toBe(true);
    expect(testFailed).toBe(false);
  });
});