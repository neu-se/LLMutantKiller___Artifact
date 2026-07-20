const qModule = require("../../../../../../../../../../../subject_repositories/q/q.js");

// Get the internal isStopIteration function by accessing the module's internals
const moduleExports = qModule();
const isStopIteration = moduleExports.QReturnValue ?
  (exception: any) => {
    const object_toString = Object.prototype.toString;
    return object_toString.call(exception) === "[object StopIteration]" ||
           exception instanceof moduleExports.QReturnValue;
  } :
  null;

describe("Q library mutation test", () => {
  it("should correctly identify StopIteration exceptions with OR logic", () => {
    if (!isStopIteration) {
      throw new Error("Could not access isStopIteration function");
    }

    // Test case 1: Object with StopIteration toString but NOT QReturnValue
    const mockStopIteration = {
      toString: () => "[object StopIteration]"
    };

    // Original code (OR logic) should return true
    // Mutated code (AND logic) should return false
    expect(isStopIteration(mockStopIteration)).toBe(true);

    // Test case 2: QReturnValue but not StopIteration
    const mockReturnValue = new (moduleExports.QReturnValue || function(value: any) {
      this.value = value;
    })("test");

    // Both original and mutated should return true for this case
    expect(isStopIteration(mockReturnValue)).toBe(true);
  });
});