import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q.set() behavior", () => {
    it("should set a property on the object when fulfilled", () => {
        const testObject = {};
        return Q(testObject)
            .set("testProperty", "testValue")
            .then(() => {
                expect((testObject as any).testProperty).toBe("testValue");
            });
    });
});