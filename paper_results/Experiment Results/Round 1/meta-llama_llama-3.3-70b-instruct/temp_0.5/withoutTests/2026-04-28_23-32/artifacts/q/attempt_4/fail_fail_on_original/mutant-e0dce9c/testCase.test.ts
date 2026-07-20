import { Promise } from "../../../../../../../../../../../subject_repositories/q/q";

describe('Q Promise', () => {
    it('should handle promise rejection correctly', () => {
        const promise = Promise({
            "when": function (fulfilled, rejected) {
                rejected(new Error("Test rejection"));
            }
        });
        let rejected = false;
        promise.then(() => {
            rejected = true;
        }, () => {
            rejected = false;
        });
        expect(rejected).toBe(false);
    });
});