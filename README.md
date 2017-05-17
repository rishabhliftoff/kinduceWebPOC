# liftoff react starter kit

## Prerequisites
	- Node.js 6.x
	- other dependencies are included in package.json, and can be installed using npm.

## Project Template
Is adopted from these two projects
- [react-slingshot](https://github.com/coryhouse/react-slingshot)
- [pluralsight-redux-starter](https://github.com/coryhouse/pluralsight-redux-starter)  

## Project Setup
`$> npm install`  # to install the npm packages  
`$> npm run format`  # to format the code  
`$> npm run lint`  # to check lint issues  
`$> npm run dev` # to run the server. note this will list all the lint issues that needs to be fixed. Opens a browser for hot reloading and also watches for eslint issues.  

## Developer NOTE
1. **NO CONFIDENTIAL DATA TO BE CHECKED-IN**.

### Code-Review Process
1. Never work on **master** branch.
2. Before working on a feature or issue, developers need to branch off from master. Use convention like issue-\<\<number>>.
3. Each commit should need to be link to a github ticket.
4. Once an issue is fixed, a pull request needs to be raised.
5. Once reviewed, project owner will merge the branch into master.
6. Integration/Unit Test cases needs to be present.
7. A Release needs to cut before every deployment.

## Folder Structure
```
bin/
src/  
    actions/  
	auth/
	components/
	config/
	containers/
	reducers/
	sagas/
	screens/
	store/
	*.html
	*.js
	*.test.js
```

**src/components: contains dumb UI components written using pure functions.
**src/containers: contains smart components.
**src/screens: contains pages that are mapped to a route and contains containers and components.

**src/*.test.js: are the test files.
