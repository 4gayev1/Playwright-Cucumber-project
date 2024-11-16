import { addElements } from "./elementController";
const fs =require("fs");

function featureDefiner(runningFeature) {
  const featureName = runningFeature.runningFeature.split(/[\/\\]/).pop().split('.')[0].toLowerCase();;
  fs.readdir("src/test/POM", (err, files) => {
    files.forEach((file) => {
      const POMfileName = file.split(".")[0].toLowerCase();
      if (POMfileName === featureName) {
        fs.readFile(`src/test/POM/${file}`, "utf-8", (err, content) => {
          addElements(JSON.parse(content));
        });
      }
    });
  });
}

export default featureDefiner;
