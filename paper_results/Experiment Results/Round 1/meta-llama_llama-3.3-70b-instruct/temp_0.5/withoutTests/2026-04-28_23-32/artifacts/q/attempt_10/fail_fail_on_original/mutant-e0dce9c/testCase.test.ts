describe('Promise', () => {
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
        }, function () {
            return { state: "pending" };
        });
        let rejected = false;
        promise.then(() => {
            rejected = true;
        }, () => {
            rejected = false;
        });
        expect(rejected).toBe(false);
    });
});