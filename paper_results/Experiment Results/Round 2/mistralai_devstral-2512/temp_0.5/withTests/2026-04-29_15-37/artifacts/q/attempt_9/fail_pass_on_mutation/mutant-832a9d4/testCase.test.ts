import Q from "../../../../../../../../../../../../../subject_repositories/q/q.js";

describe("nextTick implementation behavior", () => {
    it("should handle nested promise resolutions correctly", () => {
        let executionOrder: string[] = [];

        return Q.resolve()
            .then(() => {
                executionOrder.push("first");
                return Q.resolve();
            })
            .then(() => {
                executionOrder.push("second");
                return Q.resolve();
            })
            .then(() => {
                executionOrder.push("third");
                expect(executionOrder).toEqual(["first", "second", "third"]);
            });
    });
});