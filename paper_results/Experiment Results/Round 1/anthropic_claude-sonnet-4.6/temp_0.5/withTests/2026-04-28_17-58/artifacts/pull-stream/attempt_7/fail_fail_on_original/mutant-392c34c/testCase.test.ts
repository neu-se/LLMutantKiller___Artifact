import drainModule from "../../../../../../../../../../../subject_repositories/pull-stream/sinks/drain.js";
import fs from "fs";
import path from "path";

describe("find sink", () => {
  it("should expose drain source to understand end value", (done) => {
    // Read drain.js to understand what it passes
    const drainPath = path.resolve("../../../../../../../../../../../subject_repositories/pull-stream/sinks/drain.js");
    const content = fs.readFileSync(
      path.join(process.cwd(), "subject_repositories/pull-stream/sinks/drain.js"),
      "utf8"
    );
    console.log("DRAIN CONTENT:", content);
    
    // Read find.js too
    const findContent = fs.readFileSync(
      path.join(process.cwd(), "subject_repositories/pull-stream/sinks/find.js"),
      "utf8"
    );
    console.log("FIND CONTENT:", findContent);
    
    done();
  });
});