import {
  BeforeAll,
  AfterAll,
  Before,
  After,
  Status,
  AfterStep,
} from "@cucumber/cucumber";
import { BrowserContext } from "playwright";
import { fixture } from "../helper/imports/commons";
import { invokeBrowser } from "../helper/browsers/browserManager";
import { getEnv } from "../helper/env/env";
import featureDefiner from "../helper/POM_controller/featureDefiner";
const fs =require("fs");

let browser: BrowserContext;

BeforeAll(async function () {
  getEnv();
});

Before(async function ({ pickle }) {
  browser = await invokeBrowser(`./test-results/visualReport/${pickle.name}`);
  fixture.page = await browser.newPage();
  featureDefiner(pickle.uri);
});

After(async function ({ pickle, result }) {
  let img: Buffer;

  if (result?.status == Status.FAILED) {
    img = await fixture.page.screenshot({
      path: `./test-results/visualReport/${pickle.name}/${pickle.name}.png`,
      type: "png",
    });
  }

  if (result?.status == Status.FAILED) {
    this.attach(img, "image/png");
  }

  await fixture.page.close();
  await browser.close();

  if (result?.status == Status.FAILED) {
    const videoPath = await fixture.page.video().path();
    const webmBuffer = await fs.readFileSync(videoPath);
    await this.attach(webmBuffer, "video/webm");
  }
});
