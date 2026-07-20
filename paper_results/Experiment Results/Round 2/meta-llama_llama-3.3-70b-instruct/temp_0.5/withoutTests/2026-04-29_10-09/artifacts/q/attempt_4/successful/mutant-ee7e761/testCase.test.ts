import q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q Promise", () => {
    it("should delete a property from an object", () => {
        var obj = { a: 1, b: 2 };
        var promise = q(obj);
        var deleted = promise["delete"]("a");
        expect(deleted).toHaveProperty("dispatch");
        return deleted.then(function() {
            return promise.inspect();
        }).then(function(inspected: any) {
            expect(inspected.state).toBe("fulfilled");
            expect(inspected.value).toEqual({ b: 2 });
        });
    });
});