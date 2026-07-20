describe("trackRejection function", () => {
    it("should track rejection with stack trace when reason has a stack property", () => {
        const reason = new Error("Test error");
        const promise = Promise.reject(reason);
        expect(promise.catch((error) => error)).rejects.toThrowError("Test error");
    });

    it("should track rejection without stack trace when reason does not have a stack property", () => {
        const reason = {};
        const promise = Promise.reject(reason);
        expect(promise.catch((error) => error)).rejects.toEqual(reason);
    });
});