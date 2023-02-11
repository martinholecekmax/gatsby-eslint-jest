# Configuring ESLint and Jest for a Gatsby project

This guide will walk you through the steps of implementing ESLint and Jest in your Gatsby project.

Have you ever wanted to use ESLint and Jest for a Gatsby project, but had trouble getting them to work together? This guide will show you how to set up ESLint and Jest for a Gatsby project.

Setting up ESLint and Jest for a Gatsby project can be tricky, and time-consuming. I've spent hours trying to get them to work together, and I've finally figured it out.

For this reason, I've decided to write this guide to help others who are struggling with the same problem.

For development, I use VS Code as my code editor. I believe that VS Code is the best code editor for JavaScript development, and I highly recommend it. If you're using VS Code, you can install the ESLint extension to get real-time linting in your code editor. This is a great way to test that ESLint is working correctly. You can find this extension at the following link:

[VS code ESLint extension](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint).

## Getting started

First, you'll need to create a new Gatsby project. You can do this by running the following command and following the prompts:

```shell
npm init gatsby
```

After you've created a new Gatsby project, you'll need to navigate to the project's root directory. I've named my project `my-gatsby-project`, so I'll navigate to that directory. You can do this by running the following command:

```shell
cd my-gatsby-project
```

## Installing ESLint

Now that we have a Gatsby project to work with, we can install ESLint. To do this, we'll need to install the following ESLint package:

```shell
npm install --save-dev eslint-config-react-app
```

After you've installed the ESLint package, you'll need to create a new file called `.eslintrc.js` in the root directory of your project that will contain the configuration for ESLint.

I prefer to create a `javascript` file for my ESLint configuration, but you can also create a `json` file if you prefer. I find that the `js` file is more versatile to use, and it allows you to add comments to your configuration.

Now that we have a file to work with, we can add the following configuration to it:

```javascript
// .eslintrc.js
module.exports = {
  globals: {
    __PATH_PREFIX__: true,
  },
  extends: `react-app`,
  rules: {
    'prefer-const': 'error',
  },
};
```

I've added `prefer-const` to the `rules` section of the configuration which will cause ESLint to throw an error if you try to use `let` instead of `const` when declaring a variable. This is a great way to test that ESLint is working correctly. Feel free to add any other rules that you want to use. You can find a list of all the rules that ESLint supports [here](https://eslint.org/docs/rules/).

To test that ESLint is working correctly, you can go to any file in your project and try to use `let` instead of `const` when declaring a variable. You should see an error in your code editor.

## Installing Jest

Now that we have ESLint working correctly, we can install Jest. To do this, we'll need to install the following Jest packages:

```shell
npm install --save-dev jest babel-jest babel-preset-gatsby identity-obj-proxy
```

After you've installed the Jest packages, you'll need to create a new file called `jest.config.js` in the root directory of your project that will contain the configuration for Jest.

```javascript
// jest.config.js
module.exports = {
  transform: {
    '^.+\\.jsx?$': `<rootDir>/jest-preprocess.js`,
  },
  moduleNameMapper: {
    '.+\\.(css|styl|less|sass|scss)$': `identity-obj-proxy`,
    '.+\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$': `<rootDir>/__mocks__/file-mock.js`,
  },
  testPathIgnorePatterns: [`node_modules`, `\\.cache`, `<rootDir>.*/public`],
  transformIgnorePatterns: [
    `node_modules/(?!(gatsby|gatsby-script|gatsby-link)/)`,
  ],
  globals: {
    __PATH_PREFIX__: ``,
  },
  testEnvironmentOptions: {
    url: `http://localhost`,
  },
  setupFiles: [`<rootDir>/loadershim.js`],
};
```

We also need to create a new file called `jest-preprocess.js` in the root directory of your project that will contain additional configuration for Jest to work with Babel.

```javascript
// jest-preprocess.js
const babelOptions = {
  presets: ['babel-preset-gatsby'],
};

module.exports = require('babel-jest').default.createTransformer(babelOptions);
```

Another file that we need to create is called `loadershim.js` in the root directory of your project. This file is used for creating a global variable for `__loader` which allows gatsby to load files before running tests.

```javascript
// loadershim.js
global.___loader = {
  enqueue: jest.fn(),
};
```

We can add the following script to our `package.json` file to run our tests:

```json
// package.json
"scripts": {
  "test": "jest"
}
```

To test that Jest is working correctly, you can create a new folder called `__tests__` in the `src` directory of your project. Then, you can create a new file called `example.test.js` in the `__tests__` directory. You can add the following code to the file:

```javascript
// src/__tests__/example.test.js
describe(`example`, () => {
  test(`should pass`, () => {
    expect(true).toBe(true);
  });
});
```

Now, you can run the following command to run your new test:

```shell
npm run test
```

You should see that your test passes.

## Setting up ESLint with Jest

Now that we have ESLint and Jest working correctly, we can set them up to work together. To do this, we'll need to install the following ESLint plugin. Make sure that you install the plugin as a `devDependency`:

```shell
npm i eslint-plugin-jest --save-dev
```

After you've installed the ESLint plugin, you'll need to add the following configuration to your `.eslintrc.js` file to tell ESLint to use the Jest plugin:

```javascript
// .eslintrc.js
module.exports = {
  globals: {
    __PATH_PREFIX__: true,
  },
  extends: [`react-app`, 'plugin:jest/all'],
  rules: {
    'prefer-const': 'error',
  },
};
```

You should now see that ESLint is throwing errors for the example test that we created earlier. I've intentionally added a test that will fail to show you how ESLint will catch these errors. To fix the errors, you can change the `test` function to `it` and add `expect.assertions()` to the test.

```javascript
// src/__tests__/example.test.js
describe(`example`, () => {
  it(`should pass`, () => {
    expect.hasAssertions();
    expect(true).toBe(true);
  });
});
```

The `expect.hasAssertions()` function can be undesirable to use, so you can also add the following configuration to your `.eslintrc.js` file to tell ESLint to ignore the `expect.hasAssertions()` function:

```javascript
// .eslintrc.js
module.exports = {
  globals: {
    __PATH_PREFIX__: true,
  },
  extends: [`react-app`, 'plugin:jest/all'],
  rules: {
    'prefer-const': 'error',
    'jest/prefer-expect-assertions': 'off',
  },
};
```

## Some other issues

I've run into a few other issues while setting up ESLint and Jest with Gatsby which have been related to my project's configuration. You may run into some of these issues as well, so I've included some of the solutions that I've found below.

Some of the Jest rules inside the `.eslintrc.js` file might need you to install additional packages. For example, the `unbound-method` rule might throw an error if you don't have the `@typescript-eslint/eslint-plugin` package installed. You can install this package by running the following command:

```shell
npm i @typescript-eslint/eslint-plugin --save-dev
```

In my previous Gatsby project, I had some weird issues with ESLint and Jest. However, these were probably because I made that project a long time ago and I've changed a lot of things since then.

I don't have any of these issues in the project that I've set up for this blog post. However, if you run into any issues, please let me know in the comments below and I'll try to help you out.

## TypeScript Note

In my project, I'm using JavaScript instead of TypeScript because, in our project, we started out using JavaScript and then decided not to use TypeScript. This is a case of many projects that started early on in the React ecosystem.

I might write another blog post about how to add TypeScript to a Gatsby project with ESLint and Jest in the future.

Please refer to the [Gatsby TypeScript tutorial](https://www.gatsbyjs.com/docs/how-to/custom-configuration/typescript/) for more information about adding TypeScript to a Gatsby project.

## Conclusion

In this blog post, we've learned how to set up ESLint and Jest with Gatsby. We've also learned how to set up ESLint and Jest to work together.

You can find the code for this blog post on [GitHub](https://github.com/martinholecekmax/gatsby-eslint-jest).

If you have any questions or comments, please let me know in the comments below. I'd love to hear your thoughts.

Happy coding! 🚀

## Resources

- [GitHub project](https://github.com/martinholecekmax/gatsby-eslint-jest)
- [VS code ESLint extension](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint)
- [Gatsby ESLint tutorial](https://www.gatsbyjs.com/docs/how-to/custom-configuration/eslint/)
- [Gatsby Jest tutorial](https://www.gatsbyjs.com/docs/how-to/testing/unit-testing/)
- [Gatsby TypeScript tutorial](https://www.gatsbyjs.com/docs/how-to/custom-configuration/typescript/)
- [ESLint](https://eslint.org/)
- [Jest](https://jestjs.io/)
