// Copyright (c) 2014-2019, MyMonero.com
//
// All rights reserved.
//
// Redistribution and use in source and binary forms, with or without modification, are
// permitted provided that the following conditions are met:
//
// 1. Redistributions of source code must retain the above copyright notice, this list of
//	conditions and the following disclaimer.
//
// 2. Redistributions in binary form must reproduce the above copyright notice, this list
//	of conditions and the following disclaimer in the documentation and/or other
//	materials provided with the distribution.
//
// 3. Neither the name of the copyright holder nor the names of its contributors may be
//	used to endorse or promote products derived from this software without specific
//	prior written permission.
//
// THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY
// EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF
// MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL
// THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL,
// SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO,
// PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS
// INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT,
// STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF
// THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
//
"use strict"

//
import commonComponents_navigationBarButtons from '../MMAppUICommonComponents/navigationBarButtons.web';

//
import Views__cssRules from '../Views/cssRules.web';

const NamespaceName = "ThemeController"
const haveCSSRulesBeenInjected_documentKey = "__haveCSSRulesBeenInjected_"+NamespaceName
function cssRules_generatorFn(context)
{
	const assetsPath = "../../../../"
	const cssRules =
	[
		`@font-face {
			font-family: Native-Regular;
			src: url("${assetsPath}assets/font/Native-Regular.otf") format("opentype");
		}`,
		`@font-face {
			font-family: Native-Light;
			src: url("${assetsPath}assets/font/Native-Light.otf") format("opentype");
		}`,
		`@font-face {
			font-family: Native-Bold;
			src: url("${assetsPath}assets/font/Native-Bold.otf") format("opentype");
		}`,
	]
	return cssRules
}
function __injectCSSRules_ifNecessary(context) 
{
	Views__cssRules.InjectCSSRules_ifNecessary(
		haveCSSRulesBeenInjected_documentKey, 
		cssRules_generatorFn,
		context
	)
}

//
class ThemeController
{
	constructor(options, context)
	{
		const self = this
		self.options = options
		self.context = context
		self.injectCSSRules_ifNecessary(context)
	}
	injectCSSRules_ifNecessary(context) 
	{
	}
	//
	// Accessors - UI - Metrics - Fonts
	FontFamily_sansSerif()
	{
		return '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif'
	}
	FontFamily_monospaceLight()
	{
		return 'Native-Light, input, menlo, monospace'
	}
	FontFamily_monospaceRegular()
	{
		return 'Native-Regular, input, menlo, monospace'
	}
	FontFamily_monospaceBold()
	{
		return 'Native, input, menlo, monospace'
	}
	//
	// Accessors - Internal
	_shouldDisableChromeDesktopSpecificTextRendering()
	{
		const self = this
		return 
	}

	//
	// Imperatives - Centralizations of element styling (for, e.g. cross-platform support)
	StyleLayer_FontAsSmallRegularSansSerif(layer)
	{
		const self = this
		layer.style.fontFamily = self.FontFamily_sansSerif()
		layer.style.fontSize = "12px"
		layer.style.fontWeight = "500"
	}
	StyleLayer_FontAsSmallRegularMonospace(layer)
	{
		const self = this
		layer.style.fontFamily = self.FontFamily_monospaceRegular()
		layer.style.fontSize = "11px"
		layer.style.fontWeight = "lighter"
	}
	StyleLayer_FontAsMiddlingRegularMonospace(layer)
	{
		const self = this
		layer.style.fontFamily = self.FontFamily_monospaceRegular()
		layer.style.fontSize = "13px"
		layer.style.fontWeight = "normal"
	}
	StyleLayer_FontAsSubMiddlingRegularMonospace(layer)
	{
		const self = this
		layer.style.fontFamily = self.FontFamily_monospaceRegular()
		layer.style.fontSize = "12px"
		layer.style.fontWeight = "normal"
	}
	StyleLayer_FontAsMessageBearingSmallLightMonospace(layer)
	{
		const self = this
		layer.style.fontSize = "11px" // we need this to visually stand out slightly more given how it's used
		layer.style.fontFamily = self.FontFamily_monospaceRegular()
		layer.style.fontWeight = "lighter"
	}
	StyleLayer_FontAsSmallLightMonospace(layer)
	{
		const self = this
		layer.style.fontFamily = self.FontFamily_monospaceRegular()
		layer.style.fontSize = "11px"
		layer.style.fontWeight = "lighter"
	}
	StyleLayer_FontAsSmallPillLightMonospace(layer)
	{
		const self = this
		layer.style.fontFamily = self.FontFamily_monospaceRegular()
		layer.style.fontSize = "11px"
		layer.style.fontWeight = "lighter"
	}
	StyleLayer_FontAsMiddlingBoldSansSerif(layer)
	{
		const self = this
		layer.style.fontFamily = self.context.themeController.FontFamily_sansSerif()
		layer.style.fontSize = "13px"
		layer.style.fontWeight = "bold"
	}
	StyleLayer_FontAsMiddlingSemiboldSansSerif(layer)
	{
		const self = this
		layer.style.fontFamily = self.context.themeController.FontFamily_sansSerif()
		layer.style.fontSize = "13px"
		layer.style.fontWeight = "600" // semibold desired but "semibold" doesn't apparently work
	}
	StyleLayer_FontAsSmallSemiboldSansSerif(layer)
	{
		const self = this
		layer.style.fontFamily = self.context.themeController.FontFamily_sansSerif()
		layer.style.fontSize = "11px"
		layer.style.fontWeight = "600" // semibold desired but "semibold" doesn't apparently work
	}
	StyleLayer_FontAsMiddlingNormalSansSerif(layer)
	{
		const self = this
		layer.style.fontFamily = self.context.themeController.FontFamily_sansSerif()
		layer.style.letterSpacing = "0"
		layer.style.fontSize = "13px"
		layer.style.fontWeight = "normal"
	}
	StyleLayer_FontAsMiddlingButtonContentSemiboldSansSerif(
		layer, 
		isContentBrightNotDark
	)
	{
		const self = this
		layer.style.fontFamily = self.context.themeController.FontFamily_sansSerif()
		layer.style.fontSize = "13px"
		layer.style.letterSpacing = "0"
		layer.style.fontWeight = "600"
	}
	//
	// Delegation/Accessors/Protocol - Navigation Bar View - Buttons - Back button
	NavigationBarView__New_back_leftBarButtonView(clicked_fn)
	{
		const self = this
		const view = commonComponents_navigationBarButtons.New_LeftSide_BackButtonView(self.context)
		const layer = view.layer
		layer.addEventListener(
			"click",
			function(e)
			{
				e.preventDefault()
				if (view.isEnabled !== false) { // button is enabled
					clicked_fn()
				}
				return false
			}
		)
		return view
	}
}
export default ThemeController;
