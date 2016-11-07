# ASP.NET Core & Angular2 Universal starter

### What is this repo?

This repository is maintained by Angular Universal and is meant to be an advanced starter for both ASP.NET Core using 
Angular2, not only for the client-side, but to be rendered on the *server*. 

---

### What does this repo include?

- Angular2
  - Featuring Server-side rendering (Angular Universal)
	- Faster paints, better SEO, deep-linking, etc
  - Baked in best-practices (follows Angular style guide)
  - Bootstrap4 (with ng2-bootstrap) - can be rendered on the server

- Webpack build system
  - HMR : Hot Module Reloading/Replacement 
  - Production builds

- Testing frameworks
  - Unit testing with Karma/Jasmine

- Productivity 
  - Codelyzer (for real-time static code analysis) `npm run lint`
	- *Note, only VSCode & Atom can provide real-time code analysis at this moment*

- asp.NET Core 1.0.1
  - RestAPI integration
  - Integration with NodeJS to provide pre-rendering, as well as any other Node module asset you want to use.
 
----
  
### Getting Started?

> You'll need ASP.NET Core installed (1.0.1). 
> Make sure you have VStudio 2015 update 3 installed as well.

 - Fork & Clone repo
 - `npm install && dotnet restore` (if using Visual Studio it will do both of these automatically when the project is opened)
 
 > Both Visual Studio & VSCode have the neccessary Launch files to be able to run & debug immidiately.

----

# UPCOMING Features:

  - [ ] NgRx (reactive Redux application state management)
  - [x] Unit testing with Karma/Jasmine
  - [x] Add e2e protractor tests
  - [x] Add codelyzer for static code analysis
  - [ ] HMR State management
  - [ ] Angular 2.1.1+ fixes (for Universal)
  - [ ] Websockets example

----

# Universal "Gotchas"

> When building Universal components in Angular 2 there are a few things to keep in mind.

 - To use `templateUrl` or `stylesUrl` you must use **`angular2-template-loader`** in your TS loaders.
    - This is already setup within this starter repo. Look at the webpack.config file [here](https://github.com/angular/universal-starter/blob/master/webpack.config.ts) for details & implementation.
 - **`window`**, **`document`**, **`navigator`**, and other browser types - _do not exist on the server_ - so using them, or any library that uses them (jQuery for example) will not work. You do have some options, if you truly need some of this functionality:
    - If you need to use them, consider limiting them to only your main.client and wrapping them situationally with the imported *isBrowser / isNode* features from Universal.  `import { isBrowser, isNode } from 'angular2-universal'`;
    - Another option is using `DOM` from ["@angular/platform-browser"](https://github.com/angular/angular/blob/e3687706c71beb7c9dbdae1bbb5fbbcea588c476/modules/%40angular/platform-browser/src/dom/dom_adapter.ts#L34)
 - **Don't manipulate the nativeElement directly**. Use the _Renderer_. We do this to ensure that in any environment we're able to change our view.
```
constructor(element: ElementRef, renderer: Renderer) {
  renderer.setElementStyle(element.nativeElement, 'font-size', 'x-large');
}
```
 - The application runs XHR requests on the server & once again on the Client-side (when the application bootstraps)
    - Use a [UniversalCache](https://github.com/angular/universal-starter/blob/master/src/app/universal-cache.ts) to save certain requests so they aren't re-ran again on the Client.
 - Know the difference between attributes and properties in relation to the DOM.
 - Keep your directives stateless as much as possible. For stateful directives, you may need to provide an attribute that reflects the corresponding property with an initial string value such as url in img tag. For our native <img src=""> element the src attribute is reflected as the src property of the element type HTMLImageElement.