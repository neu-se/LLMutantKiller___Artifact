describe("Q Promise", () => {
    it("should delete a property from an object and throw an error when deleting with an empty method name", () => {
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
            const promise2 = new Promise((resolve, reject) => {
                try {
                    // Simulate the behavior of the Q library with an empty method name
                    const deleteMethod = value["delete"];
                    deleteMethod.call(value, "");
                    resolve(value);
                } catch (error) {
                    reject(error);
                }
            });
            return promise2.catch((error: any) => {
                expect(error).toBeInstanceOf(Error);
            });
        });
    });
});