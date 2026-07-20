import { Q } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q function post method", () => {
    it("should handle post with no name", () => {
        var subject = {
            post: function (value) {
                return value;
            }
        };
        return Q(subject).post(null, [10]).then(function (result) {
            expect(result).toBe(10);
        });
    });

    it("should handle post with a name", () => {
        var subject = {
            foo: function (value) {
                return value;
            }
        };
        return Q(subject).post("foo", [10]).then(function (result) {
            expect(result).toBe(10);
        });
    });

    it("should reject if the method does not exist", () => {
        var subject = {};
        return Q(subject).post("foo", [10]).then(function () {
            expect(true).toBe(false);
        }, function () {
            expect(true).toBe(true);
        });
    });
});