import { Q } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("array_indexOf mutation test", () => {
    it("should correctly find index of value in array", () => {
        // Create an object that will trigger the array_indexOf shim
        // by not having native indexOf support (simulated by using an array-like object)
        const arrayLike = {
            0: "a",
            1: "b",
            2: "c",
            length: 3
        };

        // Test that Q.keys works correctly with this array-like object
        // This will internally use array_indexOf through object_keys
        return Q(arrayLike).keys().then((keys) => {
            // The mutation would cause an infinite loop, so this test would timeout
            // In the original code, it should complete successfully
            expect(keys).toEqual(["0", "1", "2"]);
        });
    });
});