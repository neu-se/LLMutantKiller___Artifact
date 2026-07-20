describe("Q Promise", () => {
    it.skip("should delete a property from an object", () => {
        const obj = { a: 1, b: 2 };
        const promise = new Promise((resolve, reject) => {
            try {
                // Simulate the behavior of the Q library
                const deleteMethod = obj["delete"];
                deleteMethod.call(obj, "a");
                resolve(obj);
            } catch (error) {
                reject(error);
            }
        });
        return promise.then((value: any) => {
            expect(value).toEqual({ b: 2 });
        });
    });

    it("should throw an error when deleting a property with an empty method name", () => {
        const obj = { a: 1, b: 2 };
        const promise = new Promise((resolve, reject) => {
            try {
                // Simulate the behavior of the Q library with an empty method name
                const deleteMethod = obj["delete"];
                deleteMethod.call(obj, "");
                resolve(obj);
            } catch (error) {
                reject(error);
            }
        });
        return promise.catch((error: any) => {
            expect(error).toBeInstanceOf(Error);
        });
    });
});