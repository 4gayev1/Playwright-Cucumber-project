import {
  LaunchOptions,
  BrowserContextOptions,
  chromium,
  firefox,
  webkit,
  Browser,
} from "playwright";
const config = require("../../../cucumber.config.js");

export const invokeBrowser = async (videoPath) => {
  const browserType = process.env.npm_config_BROWSER || "chrome";

  let browser: Browser;

  const options: LaunchOptions = {
    headless: config.browser.headless,
  };

  const contextOptions: BrowserContextOptions = {
    viewport: config.browser.viewport,
    recordVideo: {
      dir: `${videoPath}`,
      size: config.viewport,
    },
  };

  switch (browserType) {
    case "chrome":
      browser = await chromium.launch(options);
      break;
    case "firefox":
      browser = await firefox.launch(options);
      break;
    case "webkit":
      browser = await webkit.launch(options);
      break;
    default:
      throw new Error("Please set the proper browser!");
  }

  const context = await browser.newContext(contextOptions);
  return context;
};
