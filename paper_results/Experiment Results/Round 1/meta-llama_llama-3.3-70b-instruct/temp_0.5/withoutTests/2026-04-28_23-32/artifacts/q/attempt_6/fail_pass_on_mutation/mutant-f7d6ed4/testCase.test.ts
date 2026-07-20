describe("Q", () => {
    it("should handle process.domain correctly", () => {
        const originalProcess = global.process;
        try {
            global.process = { domain: null };
            const onUnhandledError = jest.fn();
            const promise = { done: jest.fn((fulfilled, rejected, progress) => {
                if (rejected) {
                    if (global.process && global.process.domain) {
                        onUnhandledError = global.process.domain.bind(onUnhandledError);
                    }
                }
            }) };
            promise.done(() => {}, () => {}, () => {});
            expect(onUnhandledError).not.toHaveBeenCalled();
        } finally {
            global.process = originalProcess;
        }
    });
});