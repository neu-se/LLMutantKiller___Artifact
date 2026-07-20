describe('Q Promise', () => {
    it('should handle promise rejection correctly', () => {
        const promise = Promise({
            "when": function (fulfilled: (value: any) => void, rejected: (reason: any) => void) {
                rejected(new Error("Test rejection"));
            }
        }, function (op: string, args: any[]) {
            if (op === "isPending") {
                return true;
            }
            throw new Error("Unsupported operation");
        });
        let rejected = false;
        promise.then(() => {
            rejected = true;
        }, () => {
            rejected = false;
        });
        // The mutation changes the condition in the Promise.prototype.valueOf function
        // to inspected.state !== "rejected", so it will return the promise instead of the value
        // This causes the then method to be called with the promise as the argument, which will
        // lead to the fulfilled callback being called instead of the rejected callback
        expect(rejected).toBe(true);
    });
});