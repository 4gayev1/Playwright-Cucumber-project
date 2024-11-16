module.exports = {
  default: {
    tags: process.env.npm_config_TAGS || "",
    format: [
            "progress-bar",
            "rerun:@rerun.txt",
            "allure-cucumberjs/reporter"],
    formatOptions: {
      resultsDir: "allure-result",
    },
    paths: ["src/test/features/"],
    dryRun: false,
    require: ["src/test/step_definitions/*.ts", "src/hooks/hooks.ts"],
    requireModule: ["ts-node/register"],
    parallel: 2,
  },
  browser: {
    viewport: {
      width: 1280,
      height: 720,
    },
    headless: !true,
  },
};
