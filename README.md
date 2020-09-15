# Web Wallet 

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

* Browser: None (no data is saved)


## Reporting Bugs & Making Feature Requests

If you would like to report an issue or share a feature request, please create a Github [Issue](https://github.com/mymonero/monero-web-js/issues) on this project.

If you're reporting a bug, be sure to include all information which we would need to reproduce the issue, such as the operating system and app version on which you saw the bug, and the steps you took, if you can tell. 

Please don't use the Issues tracker for general support or inquiries. You can also [contact us](https://mymonero.com/support) directly.


# Contributing & Testing


## Getting the Source Code

### Download & Install

1. First, ensure that you have recent versions of `node` and `npm` installed.

2. Clone or otherwise download this repository. Then, in your terminal, `cd` into the repo directory.

3. (To get the bleeding edge, and/or if you are going to make changes) Switch to the `develop` branch by executing `git checkout develop`.

4. Install all required `node_modules` by executing `npm install`.


## Repo Contents Overview
* Local, application source code is located in `local_modules/`. This includes bundled/static third-party "Vendor" libraries such as [EmojiOne](http://emojione.com).

* After installation, non-bundled third-party modules will be located in `node_modules/`.

* App package and build process info is located in `package.json`.

* This readme is located at `README.md`, and the license is located at `LICENSE.txt`.


## Building for Production

If you want to run the browser build which is provided in the releases, simply unzip it, `cd` into the browser_build directory, then run `python -m SimpleHTTPServer 9100` (replacing the port with one of your choice if needed). Then, open your browser of choice and navigate to `http://localhost:9100`.


### Browser (Web wallet)

`npm run start`

*Note:* This will run the command `python -m SimpleHTTPServer 9100` to serve `./browser_build`. After this command completes, open your browser of choice and navigate to `http://localhost:9100`.


## Contributing

### Testing

Please submit any bugs as Issues unless they have already been reported.

Suggestions and feedback are very welcome!


### Developing

If you have an improvement to the codebase and would like to have your code shipped in the production MyMonero app, please submit a [pull request](https://help.github.com/articles/about-pull-requests/), even if it's still a WIP. We try to credit all contributors in app release notes.

* Merging PRs which involve integrating with any third-party services will require discussion and agreement.  

* We reserve the right to refuse to merge any PRs, such as those which introduce breaking changes.

The maintainer enjoys collaborating with volunteer contributors to the MyMonero apps over IRC private message and the #mymonero room on freenode.net (Come say hello!), so PR'd submissions do not have to be at all complete or perfect on their first submission. (To submit a draft PR for review, simply mark it as '[DO NOT MERGE]')

There's also an icebox of ideas, features, improvements, known issues, and other todos waiting to be knocked out which are kept in the [Issues](https://github.com/mymonero/monero-app-js/issues) tracker.


### Donating

MyMonero Donation Address (XMR): 48yi8KBxh7fdZzwnX2kFCGALRcN1sNjwBHDfd5i9WLAWKs7G9rVbXNnbJTqZhhZCiudVtaMJKrXxmBeBR9kggBXr8X7PxPT

Proceeds from donations are used to fund development on the MyMonero back-end server (a performant version of which we soon™ plan to open-source for anyone to run their own server at home). Any remaining funds will go towards product (app UI) R&D, and hosting costs.



## Acknowledgements

Contributors to each release are credited in release notes.

### Core Contributors

* 🍕 `Tekkzbadger` ([Devin Pearson](https://github.com/devinpearson)) Lead maintainer; core developer

* 💱 `jkarlos` ([Karl Buys](https://github.com/karlbuys)) Maintainer; core developer

* 🦄 `fluffyponyza` ([Riccardo Spagni](https://github.com/fluffypony)) Advisor; MyMonero founder; Monero core team member

* 🏂 `endogenic` ([Paul Shapiro](https://github.com/paulshapiro)) Former core maintainer; MyMonero core contributor

* 😎 `vtnerd` ([Lee Clagett](https://github.com/vtnerd)) Lead back-end developer

* 🍄 `luigi` Monero tech advisor; Main MyMonero JS core crypto contributor

* 🔥 `mds` ([Matt Smith](http://mds.is)) MVP designer

* 🌠 Your name here?
