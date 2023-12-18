# SE Hub OpenHI Coding Challenge Two

There are six levels to this coding challenge, and an optional extra level. You have until the first OpenHI session next year to complete these levels (1/10/24). Each level is more difficult than the last.

If you do not have a local environment set up to run code, check out workspaces on codecademy:

- Navigate here: https://www.codecademy.com/articles
- Then go to Resources > Workspaces
- Click "+ New Workspace" and choose your preferred language
- You will need to copy the contents of the files in this directory into the workspace
  - Unfortunately, there is not a way to upload files, so you would need to copy them manually

If you use Generative AI or google to help with this problem, great! Include your prompts and search queries in your answers when you submit them 🙂 (This is optional, so don't worry if you did not capture them)

Submit your final code [here](https://collab.lilly.com/:f:/r/sites/SoftwareEngineeringHubLRL/Shared%20Documents/OpenHI/SE%20Hub%20OpenHI%20Coding%20Challenge%20Two%20-%20Submissions?csf=1&web=1&e=HANQ2c). Also, feel free to use the provided folder structure to separate your code, or feel free to submit as one file as well 🙂

## Level 1

In your coding language of choice:

1. Write a function that will convert a string to hexadecimal string
   1. You may need to convert the string to binary first, depending on the language
   2. For example, `hello world` would become `68656c6c6f20776f726c64`
2. Expand the function to create two colors with the hexadecimal string. Include `#` in the color string
   1. The first color should be the first six digits of the hexadecimal string
      1. For example from above, the first color should be `#68656c`
   2. The second color should be the last six digits
      1. For example from above, the second color should be `#726c64`
   3. If you are unfamiliar with hexadecimal colors, check out: [How do hexadecimal colors work.md](./How%20do%20hexadecimal%20colors%20work.md)
3. Address these edge cases (if you have not already)
   1. If the hexadecimal string is less than 12 characters, the resulting colors can "overlap"
      1. For example if the string is `aabbccdd` then the colors should be `#aabbcc` and `#bbccdd`
   2. If the hex string is less than 6 characters, replace all the other characters as `0`
      1. For example, if the hex string is `1` then the colors should be `#100000` and `#100000`
      2. Also, if the string is `""` then return `#000000`
4. As a return of your function, return the colors in this format:

```json
{
  "foreground": "#68656c",
  "background": "#726c64",
  "original_hex": "68656c6c6f20776f726c64",
  "original_string": "hello world"
}
```

- We will look at using those colors for something in the later levels 😉

## Level 2

1. Using the function you created, now create a UI that displays the original string with the foreground color set to foreground and the background color sent to background.

For example, using python tkinter, I created this window:

[![Alt text](./Screenshot%202023-11-07%20153105.png)]

- Now, you may notice that is unreadable... we will address that in later levels, but it may help to set the foreground or background to `#FFFFFF` while you figure out the code

If you get stuck on this level, feel free to skip to the next level which has more backend stuff.

## Level 3

As mentioned above, great we've generated colors, but it is impossible to read the text. Luckily, the W3C publishes standards for color contrast on the web, which you can read about here: https://www.w3.org/TR/WCAG21/#contrast-minimum.

You can also play around with this using a color contrast tool like the one here: https://dequeuniversity.com/color-contrast

Within the documentation you will find there is a minimum and enhanced color contrast ratios for both large and small text, which I summarized below:

| **Text Type** | **Level AA** | **Level AAA** |
| ------------- | ------------ | ------------- |
| Normal Text   | 4.5:1        | 7:1           |
| Large Text    | 3:1          | 4.5:1         |

1. Create a function that takes in the foreground color and background color from level 2, and returns whether the colors are compliant
   1. To do this you will need to know the formula to calculate luminance and the contrast ratio between two colors luminances... which I am not going to give you 🙂
      1. Instead I recommend asking a generative ai (or google)
      2. ...but, if you get stuck, you can find it in [Level 3/Don't Open Me.md](./Level%203/DON'T%20OPEN%20ME.md)
2. Return the calculated contrast ratio as well
3. Return the result in this json format

```json
{
  "normal-aa": false,
  "normal-aaa": false,
  "large-aa": false,
  "large-aaa": false,
  "contrast-ratio": "1.06:1"
}
```

3. Update your UI to show the contrast ratio, and whether the colors are compliant and in which category

## Level 4

Okay, now we know that our `hello world` text is really bad, so let's clean it up!

There are two ways to impact the luminosity of a color by either making it darker or brighter.

- When we make a color darker, we subtract from the rgb values
  - For example, `#FFFFFF` (white) can be made darker by subtracting 3 from the red, green and blue components to get `#FCFCFC`
    - If that did not make sense, check out [How do hexadecimal colors work.md](./How%20do%20hexadecimal%20colors%20work.md)
- When we make it brighter we add to the rgb values:
  - For example, `#000000` (black) can be made brighter by adding 3 from the red, green and blue components to get `#030303`

1. Write two functions
   1. One that increases the brightness of a color
   2. One that decreases the brightness of a color
   3. For both make the amount to increase/decrease an optional parameter
2. Make sure you address these edge cases
   1. If one of the rgb elements is already `FF` it cannot get any brighter, but the other elements should get brighter
   2. And vice versa, if one of the rgb elements is already `00` it cannot get any darker, but the other elements should get darker
3. Update your UI to include four buttons that do the following
   1. Increase foreground brightness
   2. Decrease foreground brightness
   3. Increase background brightness
   4. Decrease background brightness
4. Make sure the color of the string and whether the colors are compliant changes when the buttons are pressed

## Level 5

Great, now we can manually adjust the color! ...but wouldn't it be great if the app could suggest valid colors to us instead?

1. Write a function that takes a foreground and a background colors and returns the compliant colors that can be created with the combination
   1. If there is no possible value that works for a color combination, return null for that compliance level
   2. Also, limit the results as such:
      1. If you change the foreground color, only show combinations with the original background
      2. And vice versa, if you change the background color, only show combinations with the original foreground
   3. In other words, you do not have to compare every possible shade and tint of the background and the foreground with each other
      1. For example, if your starting colors are `{"foreground": "#68656c", "background": "#726c64"}`
         1. Do check `{"brighter_foreground": "#69666d", "original_background": "#726c64"}` and `{"original_foreground": "#68656c", "brighter_background": "#736d65"}`
         2. But you don't have to check `{"brighter_foreground": "#69666d", "brighter_background": "#736d65"}`
2. Return the results in this format:

```json
{
  "original-foreground": "#68656c",
  "original-background": "#726c64",
  "original-contrast-ratio": "1.06:1",
  "normal-aa": [
    {
      "foreground": "#68656c",
      "background": "#726c64",
      "contrast-ratio": "1.06:1"
    }
  ],
  "normal-aaa": null,
  "large-aa": [
    {
      "foreground": "#68656c",
      "background": "#726c64",
      "contrast-ratio": "1.06:1"
    }
  ],
  "large-aaa": null
}
```

3. Modify your UI to show the user the suggested colors

## Level 6

1. Remember that confusing section above where I said not to include the shades and tints. Modify your code to include them
2. Now implement this in a way that doesn't require calculating the contrast of every possible combination (if you didn't already)

## Level - Extra

Technically, all the levels are optional, but this level is extra optional 😅

1. If originally completed the project in a scripting language (python, typescript, etc), try completing it in a system language instead (C#, C++, Java, etc), or vice versa
   1. Or, if you want an additional challenge and/or enjoy pain, try completing level 1 in Excel without using python in Excel
2. If you are familiar with Typescript, or would like to learn, write a typescript definition for all of your function returns (basically anywhere I have a json block in this document)
   1. And if you want to make it more challenging instead of using `string` use this Typescript syntax: [TypeScript: Documentation - Template Literal Types (typescriptlang.org)](https://www.typescriptlang.org/docs/handbook/2/template-literal-types.html)
3. In [Level 4](#level-4), you originally made the amount of increase and decrease an optional parameter. Add a field where the user can input that information.
4. Looking at your UI, adjust or add something to improve the user experience
