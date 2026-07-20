describe("makeStackTraceLong function", () => {
    it("should throw an error when Q.makeStackTraceLong is not implemented and longStackSupport is true", () => {
        const Q = {
            longStackSupport: true,
            makeStackTraceLong: () => {}
        };

        const error = new Error("Test error");
        const promise = Promise.reject(error);

        expect(() => {
            Q.makeStackTraceLong(error, promise);
        }).toThrowError();
    });
});