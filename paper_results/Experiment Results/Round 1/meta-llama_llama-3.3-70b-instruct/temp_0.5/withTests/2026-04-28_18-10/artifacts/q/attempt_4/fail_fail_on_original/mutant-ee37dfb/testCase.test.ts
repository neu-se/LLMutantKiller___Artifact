import { Q } from "../../../../../q.js";

describe("q.js", () => {
    it("should test the behavior of the mutated file", () => {
        // Create a promise that resolves to an object with a method
        const promise = Q({
            post: function (name, args) {
                if (name === "method") {
                    return "result";
                } else {
                    throw new Error("Method not found");
                }
            }
        });

        // Use the post method to call the method on the resolved object
        const resultPromise = promise.post("method");

        // Check if the result is as expected
        return resultPromise.then((result) => {
            expect(result).toBe("result");
        });
    });
});