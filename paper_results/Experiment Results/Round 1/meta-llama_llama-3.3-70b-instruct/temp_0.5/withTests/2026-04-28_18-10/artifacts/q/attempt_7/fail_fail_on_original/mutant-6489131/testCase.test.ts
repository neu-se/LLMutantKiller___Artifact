import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe("Q", () => {
    it("should test the behavior of array_reduce with the mutated code", () => {
        var array = [1, , 3];
        var result = Q.fcall(function() {
            var basis = 0;
            for (var i = 0; i < array.length; i++) {
                if (i in array) {
                    basis += array[i];
                    break;
                }
            }
            return basis;
        });
        return result.then(function (sum) {
            expect(sum).toBe(1);
        });
    });
});