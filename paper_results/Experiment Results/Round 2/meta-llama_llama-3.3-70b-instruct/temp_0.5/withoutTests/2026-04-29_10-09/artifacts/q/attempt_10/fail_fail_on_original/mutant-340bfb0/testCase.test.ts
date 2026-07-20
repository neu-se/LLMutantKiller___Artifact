describe("Q promise library", () => {
    it("should have a property __minimumStackCounter__ in the error object when an error occurs", () => {
        const error = new Error();
        const promise = Q.reject(error);
        promise.catch((e: any) => {
            expect(Object.keys(e)).toContain("__minimumStackCounter__");
        });
    });
});