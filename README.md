# chrome-extention-typescript-react-starter
Boilerplate for creating a Chrome Extention with React, TypeScript, emotion jss, jest and Webpack

### Usage
1. Clone
2. Update HTML name in package.json (effects both html title and manifest name)
3. Install dependencies with `npm install`
4. Run hot module reload dev server with `npm run dev`
5. Open [chrome://extensions/](chrome://extensions/) in chrome, activate development mode, and select load unpacked, 
pick your dist folder and your'e done.

- You can also run `npm run build` which will also generate a zip file inside `dist` with the name of the repo 
prefixed by the environment, which you should upload to google when publishing the extension.
- To change version just run 
---
### Structure
    .
    ├── dist                # where you'r final build will be
    ├── docs                # Documentation files (alternatively `doc`)
    ├── src                 # Source files (alternatively `lib` or `app`)
        ├── assets          # images, icons, etc...
        ├── popup           # used for our front end, use the webpacka alias "popup" to access the files inside
        ├── background      # used for background operations, use the webpacka alias "background" to access the files inside
        ├── manifest        # name, description and version are derived from package.json
    ├── tests               # test files, using jest
    ├── coverage            # jest will create this when you run tests
    └── README.md
---
### Development Tips
- Run `yarn run dev` in one terminal window
- Run `yarn run devtest` in another terminal window

This will allow you to actively write app code and unit test code with continuous webpack HMR and test runs.



---
<div>Icons made by <a href="https://www.flaticon.com/authors/smashicons" title="Smashicons">Smashicons</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a> is licensed by <a href="http://creativecommons.org/licenses/by/3.0/" title="Creative Commons BY 3.0" target="_blank">CC 3.0 BY</a></div>
