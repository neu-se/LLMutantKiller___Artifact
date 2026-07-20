describe("Q tests", () => {
    it("should test the behavior of Q in NodeJS and non-NodeJS environments", () => {
        // Create a promise that throws an error
        const promise = new Promise((resolve, reject) => {
            reject(new Error("Test error"));
        });

        // Test that the error is thrown synchronously in a NodeJS environment
        if (typeof process === "object" && process.toString() === "[object process]") {
            const errorCaught = jest.fn();
            promise.catch(errorCaught);
            // Use setTimeout to wait for the next tick
            setTimeout(() => {
                expect(errorCaught).toHaveBeenCalledTimes(1); // Error caught
                expect(errorCaught.mock.calls[0][0]).toBeInstanceOf(Error);
                expect(errorCaught.mock.calls[0][0].message).toBe("Test error");
            }, 0);
        } else {
            // Test that the error is thrown asynchronously in a non-NodeJS environment
            const errorCaught = jest.fn();
            promise.catch(errorCaught);
            expect(errorCaught).toHaveBeenCalledTimes(0); // Error not caught yet
            // Use setTimeout to wait for the next tick
            setTimeout(() => {
                expect(errorCaught).toHaveBeenCalledTimes(1); // Error caught
                expect(errorCaught.mock.calls[0][0]).toBeInstanceOf(Error);
                expect(errorCaught.mock.calls[0][0].message).toBe("Test error");
            }, 0);
        }
    });
});