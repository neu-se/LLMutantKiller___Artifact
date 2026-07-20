import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe('Q', () => {
    it('should call the post method correctly', () => {
        var obj = {
            testMethod: function() {
                return "test";
            }
        };
        var result = Q(obj).post("testMethod", []);
        expect(result.then(function(value) {
            return value;
        })).resolves.toEqual("test");
    });
});