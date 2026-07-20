import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q.async SpiderMonkey path", () => {
    it("should call generator.next() and use its result", (done) => {
        (global as any).StopIteration = {};

        const mockMakeGenerator = function() {
            return {
                next: function() {
                    // Throw QReturnValue to signal generator completion with value 42
                    Q["return"](42);
                }
            };
        };

        const timeout = setTimeout(() => {
            delete (global as any).StopIteration;
            done(new Error("Timed out - likely infinite loop in mutated code"));
        }, 500);

        Q.async(mockMakeGenerator)()
            .then((val: any) => {
                clearTimeout(timeout);
                expect(val).toBe(42);
                delete (global as any).StopIteration;
                done();
            })
            .catch((err: any) => {
                clearTimeout(timeout);
                delete (global as any).StopIteration;
                done(new Error("Should not reject: " + err));
            });
    });
});