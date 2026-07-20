import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe("Q function post method", () => {
    it("should call the post method with no name", () => {
        var obj = {
            post: function (args) {
                return args[0] + args[1] + args[2];
            }
        };

        return Q.post(obj, null, [1, 2, 3]).then(function (result) {
            expect(result).toBe(6);
        });
    });

    it("should call the post method with a name", () => {
        var obj = {
            add: function (a, b, c) {
                return a + b + c;
            }
        };

        return Q.post(obj, "add", [1, 2, 3]).then(function (result) {
            expect(result).toBe(6);
        });
    });
});