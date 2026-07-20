describe("Q", () => {
    it("should handle process.domain correctly", () => {
        const originalProcess = global.process;
        try {
            global.process = { };
            const promise = { done: jest.fn((fulfilled, rejected, progress) => {
                if (rejected) {
                    if (typeof global.process === "object" && global.process && global.process.domain) {
                        throw new Error("Should not be called");
                    }
                }
            }) };
            promise.done(() => {}, () => {}, () => {});
            expect(promise.done).not.toHaveThrownError();
        } finally {
            global.process = originalProcess;
        }
    });
});