import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe("Q", () => {
    it("should return a promise with inspect method that returns an object with state and value", () => {
        const promise = Q({ foo: "bar" });
        expect(promise.inspect).toBeDefined();
        const inspected = promise.inspect();
        expect(inspected).toHaveProperty("state");
        expect(inspected).toHaveProperty("value");
        expect(inspected.state).toBe("fulfilled");
        expect(inspected.value).toEqual({ foo: "bar" });
        // Added this line to check if the inspect method returns an object
        expect(typeof inspected).toBe("object");
    });
});