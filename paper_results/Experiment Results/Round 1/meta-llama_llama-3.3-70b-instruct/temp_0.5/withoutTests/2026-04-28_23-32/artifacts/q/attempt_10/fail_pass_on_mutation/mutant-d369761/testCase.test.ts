describe("Q tests", () => {
    it("should return object keys", async () => {
        const obj = { a: 1, b: 2, c: 3 };
        const object_keys = (object) => {
            const keys = [];
            for (const key in object) {
                if (Object.prototype.hasOwnProperty.call(object, key)) {
                    keys.push(key);
                }
            }
            return keys;
        };
        const keys = object_keys(obj);
        expect(keys).toEqual(["a", "b", "c"]);
    });
});