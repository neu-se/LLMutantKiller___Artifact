import { Q } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q.promised function", () => {
    it("should resolve promised arguments and 'this'", () => {
        var sum = Q.promised(function add(a, b) {
            return a + b;
        });
        return sum(Q(4), Q(5)).then(function (sum) {
            expect(sum).toEqual(9);
        });
    });

    it("should resolve promised 'this'", () => {
        var inc = Q.promised(function inc(a) {
            return this + a;
        });
        return inc.call(Q(4), Q(5)).then(function (sum) {
            expect(sum).toEqual(9);
        });
    });

    it("should reject if an argument is rejected", () => {
        var exception = new Error("That is not the meaning of life.");
        var sum = Q.promised(function add(a, b) {
            return a + b;
        });
        return sum(Q.reject(exception), Q(4)).then(function () {
            expect(4).toEqual(42);
        }, function (_exception) {
            expect(_exception).toBe(exception);
        });
    });

    it("should reject if 'this' is rejected", () => {
        var exception = new Error("That is not the meaning of life.");
        var inc = Q.promised(function inc(a) {
            return this + a;
        });
        return inc.call(Q.reject(exception), Q(4)).then(function () {
            expect(4).toEqual(42);
        }, function (_exception) {
            expect(_exception).toBe(exception);
        });
    });
});