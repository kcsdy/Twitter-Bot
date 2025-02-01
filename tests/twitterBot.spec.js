// @ts-check
import { test, expect } from '@playwright/test';

test(`Twitter Login Bot`, async ({ page }) => {
  //Log In
  await test.step("Log in to twitter",async ()=>{
    try {
      await page.goto("https://x.com/login", { waitUntil: "load" });
      console.log("Page loaded successfully!");
    } catch (error) {
      console.error("Navigation failed:", error);
    }
    // @ts-ignore
    await page.locator("input[autocomplete='username']").fill(process.env.EMAIL);
  // @ts-ignore
    await page.locator("input[name='text']").fill(process.env.USER_NAME);
    await page.locator("//span[text()='Next']").click();
  // @ts-ignore
    await page.locator("input[name='password']").fill(process.env.PASSWORD);
    await page.locator("//span[text()='Log in']").click();
  });
  
  
  //Accept cookies
  await test.step("Accepting all cookies", async()=>{
    await page.locator("//span[text()='Accept all cookies']").click();
    await expect(page).toHaveURL('https://x.com/home');
  });
  


  //Click on "Tweet button"
  await test.step("Click on Post button", async()=>{
    await page.locator("a[href='/compose/post']").click();
    await expect(page).toHaveURL('https://x.com/compose/post');
    await page.waitForTimeout(2000);
  });
  

  //Write a tweet
  await test.step("writing a tweet", async()=>{
    const Tweet_text= "Cheers mate, whats the craic! Belfast";
    await page.locator("(//div[@aria-label='Post text'])[1]").fill(Tweet_text);
  });
  

  //Post the tweet
  await test.step("Posting the tweet", async()=>{
    await page.locator("button[data-testid='tweetButton']").click();
    await page.waitForTimeout(2000);
    (await page.waitForSelector("button[data-testid='app-bar-close']")).click();
    //await page.locator("button[data-testid='app-bar-close']").click();
  });
  

  //Search of a tweet using hastag
  await test.step("Searching a tweet using a hashtag", async()=>{
    await page.locator("a[href='/explore']").click();
    await expect(page).toHaveURL('https://x.com/explore');
    await page.getByPlaceholder("Search").fill("#counter-strike");
    await page.keyboard.press("Enter");
    await page.locator("//span[text()='Latest']").click();
    await page.waitForTimeout(5000);
  });
  

  // Like the first 5 tweets
  await test.step("Liking the first 5 tweets",async()=>{
    const likeButtons = await page.$$("button[data-testid='like']");

    for(let i=0;i<Math.min(likeButtons.length, 5);i++)
    {
      await likeButtons[i].click();
      console.log(`Liked Tweet ${i+1}`);
    }
    console.log("Liking complete!");
  });
  

  
});
