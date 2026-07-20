const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Q.del mutation test", () => {
    it("should correctly pass the key to delete operation", async () => {
        const testObject = { testKey: "testValue" };
        const key = "testKey";

        // Spy on the internal dispatch method
        const originalPromiseDispatch = testObject.promiseDispatch;
        testObject.promiseDispatch = jest.fn(function(resolve, op, args) {
            if (op === "delete") {
                // Verify the key is passed in args
                expect(args).toEqual([key]);
            }
            return originalPromiseDispatch ? originalPromiseDispatch.call(this, resolve, op, args) : undefined;
        });

        // Use Q to wrap and delete
        const promise = Q(testObject);
        await promise.del(key);

        // Verify the property was actually deleted
        expect(testObject.hasOwnProperty(key)).toBe(false);
    });
});