const trackRejection = (promise, reason) => {
    if (reason && typeof reason.stack !== "undefined") {
        return reason.stack;
    } else {
        return "(no stack) " + reason;
    }
};

describe("Q", () => {
    it("should track unhandled rejections correctly", () => {
        const reason = new Error("Test error");
        reason.stack = undefined;
        const unhandledReason = trackRejection(null, reason);
        expect(unhandledReason).toBe("(no stack) Error: Test error");
    });
});