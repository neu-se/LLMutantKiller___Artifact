import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe("dispatch function", () => {
    it("should dispatch a message to an object", () => {
        const object = {
            foo: () => "bar"
        };

        const result = Q.dispatch(object, "foo");
        expect(result).toBe("bar");
    });

    it("should dispatch a message to a promise for an object", () => {
        const object = {
            foo: () => "bar"
        };

        const promise = Q(object);
        const result = Q.dispatch(promise, "foo");
        expect(result).toBe("bar");
    });

    it("should reject if the object does not have the method", () => {
        const object = {};

        const promise = Q(object).dispatch("foo");
        return promise.then(() => {
            expect(true).toBe(false);
        }, (error) => {
            expect(error.message).toBe("Q can't dispatch \"foo\"");
        });
    });
});