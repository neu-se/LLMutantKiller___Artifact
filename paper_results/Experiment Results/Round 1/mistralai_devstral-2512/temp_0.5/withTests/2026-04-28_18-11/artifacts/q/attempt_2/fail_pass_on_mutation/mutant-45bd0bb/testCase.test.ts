const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("object_create mutation test", () => {
    it("should create objects with correct prototype chain", () => {
        // Test basic object creation with prototype
        const testProto = {
            testMethod: function() {
                return "works";
            }
        };

        // Create object using Object.create directly
        const obj1 = Object.create(testProto);
        expect(obj1.testMethod()).toBe("works");

        // Test Q's promise creation which internally uses object_create
        const deferred = Q.defer();
        const promise = deferred.promise;

        // Verify promise has the expected methods from its prototype
        expect(typeof promise.then).toBe("function");
        expect(typeof promise.catch).toBe("function");
        expect(typeof promise.finally).toBe("function");

        // Test that the promise can be resolved and behaves correctly
        deferred.resolve(42);
        return promise.then(function(value) {
            expect(value).toBe(42);
        });
    });
});