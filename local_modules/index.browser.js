"use strict"

import RootView from './MainWindow/Views/RootView.Lite.web' // electron uses .web files as it has a web DOM
import setup_utils from './MMAppRendererSetup/renderer_setup.browser'
import MyMoneroLibAppBridge from '@mymonero/mymonero-app-bridge'
import indexContextBrowser from './MainWindow/Models/index_context.browser'
import RootTabBarAndContentView from './MainWindow/Views/RootTabBarAndContentView.Full.web'
import { Plugins } from '@capacitor/core';

const { App } = Plugins;

window.BootApp = function()
{ // encased in a function to prevent scope being lost/freed on mobile
	const isDebug = false
	const version = '1.2.1'
	//const isMobile = ('ontouchstart' in document.documentElement); // an approximation for 'mobile'
	const isMobile = true; // an approximation for 'mobile'
	setup_utils({
		appVersion: version,
		reporting_processName: "BrowserWindow"
	})
	//
	// context
	var isHorizontalBar = isMobile;
	MyMoneroLibAppBridge({}).then(function(coreBridge_instance) // we can just use this directly in the browser version
	{
		const context = indexContextBrowser.NewHydratedContext({
			nettype: 0,
			apiUrl: 'api.mymonero.com',
    	version: version,
    	name: 'MyMonero',
			isDebug: isDebug,
			isMobile: isMobile,
			Cordova_isMobile: false, // (this can be renamed or maybe deprecated)
			crossPlatform_indexContextRelativeAssetsRootPathSuffix: "../../", // b/c index_context is in MainWindow/Views; must end up /
			platformSpecific_RootTabBarAndContentView: RootTabBarAndContentView, // slightly messy place to put this but it works
			TabBarView_thickness: isHorizontalBar ? 48 : 79,
			rootViewFooterHeight: 32,
			TabBarView_isHorizontalBar: isHorizontalBar,
			ThemeController_isMobileBrowser: isMobile,
			Tooltips_nonHoveringBehavior: isMobile, // be able to dismiss on clicks etc
			Emoji_renderWithNativeEmoji: isMobile, // b/c this is a browser, we could be on desktop, i.e. w/o guaranteed native emoji support
			appDownloadLink_domainAndPath: "mymonero.com",
			HostedMoneroAPIClient_DEBUGONLY_mockSendTransactionSuccess: false,
			Views_selectivelyEnableMobileRenderingOptimizations: isMobile,
			CommonComponents_Forms_scrollToInputOnFocus: isMobile,
			monero_utils: coreBridge_instance
		})
		window.MyMonero_context = context
		{ // configure native UI elements
			document.addEventListener("touchstart", function(){}, true) // to allow :active styles to work in your CSS on a page in Mobile Safari:
			//
			if (isMobile) {
				// disable tap -> click delay on mobile browsers
				var attachFastClick = require('fastclick')
				attachFastClick.attach(document.body)
			}
		}
		{ // root view
			const rootView = new RootView({}, context) // hang onto reference
			rootView.superview = null // just to be explicit; however we will set a .superlayer
			// manually attach the rootView to the DOM and specify view's usual managed reference(s)
			const superlayer = document.body
			rootView.superlayer = superlayer
			superlayer.appendChild(rootView.layer) // the `layer` is actually the DOM element
		}
		{ // and remove the loader (possibly fade this out)
			const el = document.getElementById("loading-spinner")
			el.parentNode.removeChild(el)
		}
	}).catch(function(e)
	{
		throw e
	});
	window.addEventListener('ionBackButton', (event) => {
		event.detail.register(10, () => {
			  App.exitApp();
		});
	});
	
}
window.BootApp()

// Add event listener for exit
document.addEventListener("deviceready", onDeviceReady, false);

function onDeviceReady() {
	App.addListener("backButton", (event) => {
		App.exitApp();
	});
}
