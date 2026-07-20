describe("Q.set", () => {
    it("should dispatch 'set' with the correct arguments", () => {
        const object: any = {};
        const key = "testKey";
        const value = "testValue";

        // Import the q.js file
        require("../../../../../../../../../subject_repositories/q/q.js");

        // Use the global Q object
        Q(object).set(key, value);

        expect(object[key]).toBe(value);
    });
});