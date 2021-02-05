# Android Wallet

![Logo](https://raw.githubusercontent.com/mymonero/mymonero-app-js/master/docs/assets/icon_100.png "Logo")


### Info

1. License and Copyrights
2. Downloads
3. Requirements & Install Locations
4. Reporting Bugs & Making Feature Requests

### Contributing and Testing

1. Getting the Source Code
2. Repo Contents Overview
3. Building for Production
4. Running in Development Mode
5. Contributing
6. Acknowledgements


## License and Copyrights

See `LICENSE.txt` for license.

All app source code and assets copyright © 2014-2020 by MyMonero. All rights reserved.


## Downloads

Download the latest version from our website at [mymonero.com](https://www.mymonero.com) or from the Releases tab.

Developers and pre-release testers who would like to use and work on the app can run it by obtaining the source and running one of the build commands below.

To get set up with the source code, please see **Getting the Source Code** below.


### Where is user data saved?

* Android: The data is encrypted and saved to the Android device using an implementation that leverages AndroidKeyStore and SharedPreferences.
* Web: The data is saved to the browser's local storage.

#### Data storage warnings: 

* Android API < 18 does not support AndroidKeyStore. Android API < 18 values are stored fallback to being stored as simple base64 encoded strings. 
* Since web browsers don't have an equivalent of Android's secure storage, data is base64-encoded before being stored in the browser's Local Storage.

## Reporting Bugs & Making Feature Requests

If you would like to report an issue or share a feature request, please create a Github [Issue](https://github.com/mymonero/monero-android-js/issues) on this project.

If you're reporting a bug, be sure to include all information which we would need to reproduce the issue, such as the operating system and app version on which you saw the bug, and the steps you took, if you can tell. 

Please don't use the Issues tracker for general support or inquiries. You can also [contact us](https://mymonero.com/support) directly.


# Contributing & Testing


## Getting the Source Code

### Download & Build

#### Prerequisites:

Make sure you are using node v10.22.1 or higher, and npm v6.14.6 or higher. The application has been confirmed to work on these specific versions

1. First, ensure that you have recent versions of `node` and `npm` installed.

2. Clone or otherwise download this repository. Then, in your terminal, `cd` into the repo directory.

3. Run `npm install`. This will install the required `node_modules`, and download the necessary MyMonero libraries.

4. Run `npm run build`. 

This will build and package the web version of the application in the `browser_build` folder. Once that is done, it will initialise all necessary build files for your Android application. Finally, it will attempt to open the project in Android Studio.  

## Repo Contents Overview
* Local, application source code is located in `local_modules/`. This includes bundled/static third-party "Vendor" libraries such as [EmojiOne](http://emojione.com).

* After installation, non-bundled third-party modules will be located in `node_modules/`.

* App package and build process info is located in `package.json`.

* After building for Android, build files will be exported to the "android" folder in the project root.

* This readme is located at `README.md`, and the license is located at `LICENSE.txt`.

## Suggested development workflow

As the application is essentially a web application which gets transpiled into Java by Capacitor, rather than transpile and build each time, we do most of our development work by running a server that serves the browser_build folder, and accessing it in Chrome. Barring unusual cases, changes made and tested on Chrome will function properly once transpiled.

When developing in this fashion, one can run a server with hot-reload enabled by using the `npm run watch` command

## Debugging the Android application

Should you run into any issues with the transpiled application, you are able to debug the application by making use of Android WebView debugging and the Chrome browser. In order to do so, follow the instructions below: 

1. Add the following code snippet to the app/java/com.mymonero.android/MainActivity.java file inside the `onCreate()` function

```
if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.KITKAT) {
    WebView.setWebContentsDebuggingEnabled(true);
}
```
2. Open Chrome
3. Navigate to chrome://inspect/#devices
4. Under "Remote Target", you should see a WebView titled "WebView in com.mymonero.android"
5. Click "inspect" to open the WebView in DevTools


## Building for Production

1. Follow the steps under `Download and Build`.
2. Use Android Studio to build the .APK file

## Contributing

### Testing

Please submit any bugs as Issues unless they have already been reported.

Suggestions and feedback are very welcome!


### Developing

If you have an improvement to the codebase and would like to have your code shipped in the production MyMonero app, please submit a [pull request](https://help.github.com/articles/about-pull-requests/), even if it's still a WIP. We try to credit all contributors in app release notes.

* Merging PRs which involve integrating with any third-party services will require discussion and agreement.  

* We reserve the right to refuse to merge any PRs, such as those which introduce breaking changes.

### Donating

MyMonero Donation Address (XMR): 48yi8KBxh7fdZzwnX2kFCGALRcN1sNjwBHDfd5i9WLAWKs7G9rVbXNnbJTqZhhZCiudVtaMJKrXxmBeBR9kggBXr8X7PxPT

Proceeds from donations are used to fund development on the MyMonero back-end server (a performant version of which we soon™ plan to open-source for anyone to run their own server at home). Any remaining funds will go towards product (app UI) R&D, and hosting costs.

## Acknowledgements

Contributors to each release are credited in release notes.

### Core Contributors

* 💱 `jkarlos` ([Karl Buys](https://github.com/karlbuys)) Lead maintainer; core developer

* 🍕 `Tekkzbadger` ([Devin Pearson](https://github.com/devinpearson)) Maintainer; core developer

* 🦄 `fluffyponyza` ([Riccardo Spagni](https://github.com/fluffypony)) Advisor; MyMonero founder; Monero core team member

* 🏂 `endogenic` ([Paul Shapiro](https://github.com/paulshapiro)) Former core maintainer; MyMonero core contributor

* 😎 `vtnerd` ([Lee Clagett](https://github.com/vtnerd)) Lead back-end developer

* 🍄 `luigi` Monero tech advisor; Main MyMonero JS core crypto contributor

* 🔥 `mds` ([Matt Smith](http://mds.is)) MVP designer

* 🌠 Your name here?
