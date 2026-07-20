import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q tests", () => {
    it("should test the behavior of object_defineProperty", () => {
        var deferred = Q.defer();
        var obj = {};
        var prop = "test";
        var descriptor = { value: "value", configurable: true };

        object_defineProperty(obj, prop, descriptor);
        deferred.resolve(obj[prop]);

        return deferred.promise.then(function (value) {
            expect(value).toBe("value");
        });
    });
});