describe("makeStackTraceLong function", () => {
    it("should throw an error when Q.makeStackTraceLong is not implemented", () => {
        const error = new Error("Test error");
        const promise = Promise.reject(error);

        expect(() => {
            promise.catch((err: any) => {
                if (err.stack === undefined) {
                    throw new Error("makeStackTraceLong is not implemented");
                }
            });
        }).toThrowError("makeStackTraceLong is not implemented");
    });
});