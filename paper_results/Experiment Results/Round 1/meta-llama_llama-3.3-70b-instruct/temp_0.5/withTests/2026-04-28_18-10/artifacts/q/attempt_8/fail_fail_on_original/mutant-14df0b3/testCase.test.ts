describe("Q.delete", () => {
    it("should delete a property from an object", () => {
        const obj = { a: 1, b: 2 };
        const promise = Q(obj).delete("a");
        return promise.then(() => {
            expect(obj).toEqual({ b: 2 });
        });
    });

    it("should return undefined", () => {
        const obj = { a: 1, b: 2 };
        const promise = Q(obj).delete("a");
        return promise.then((result: any) => {
            expect(result).toBeUndefined();
        });
    });
});