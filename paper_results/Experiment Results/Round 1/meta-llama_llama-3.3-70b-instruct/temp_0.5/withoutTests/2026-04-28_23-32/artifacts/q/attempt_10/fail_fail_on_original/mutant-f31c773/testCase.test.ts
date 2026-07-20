describe("Q", () => {
    it("should have a set method that works correctly", () => {
        const object: any = {};
        const key = "testKey";
        const value = "testValue";

        // Import the q.js file
        require("../../../../../../../../../subject_repositories/q/q.js");

        // Use the global Q object
        const Q = (global as any).Q;

        if (Q && Q(object) && Q(object).set) {
            Q(object).set(key, value);
            expect(object[key]).toBe(value);
        } else {
            expect(false).toBe(true);
        }
    });
});