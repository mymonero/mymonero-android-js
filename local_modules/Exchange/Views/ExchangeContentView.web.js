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
//"use strict"

//import Utils from '../../Exchange/Javascript/ExchangeUtilityFunctions'
//import ExchangeLibrary from 'mymonero-exchange'
//import ValidationLibrary from 'wallet-address-validator'
//import Listeners from '../../Exchange/Javascript/ExchangeListeners'
import View from '../../Views/View.web'
//import ListView from '../../Lists/Views/ListView.web'
//import emoji_web from '../../Emoji/emoji_web'
//import ExchangeFunctions from '../Javascript/ExchangeFunctions'
import commonComponents_navigationBarButtons from '../../MMAppUICommonComponents/navigationBarButtons.web'
//import commonComponents_forms from '../../MMAppUICommonComponents/forms.web'
//import commonComponents_tooltips from '../../MMAppUICommonComponents/tooltips.web'
//import WalletsSelectView from '../../WalletsList/Views/WalletsSelectView.web'
//import fs from 'fs'
//import commonComponents_contactPicker from '../../MMAppUICommonComponents/contactPicker.web
//import jsQR from 'jsqr'
//import monero_requestURI_utils from '../../MoneroUtils/monero_requestURI_utils'
import { BigInteger as JSBigInt } from '../../mymonero_libapp_js/mymonero-core-js/cryptonote_utils/biginteger' // important: grab defined expo
//import monero_sendingFunds_utils from '../../mymonero_libapp_js/mymonero-core-js/monero_utils/monero_sendingFunds_utils'
//import monero_openalias_utils from '../../OpenAlias/monero_openalias_utils'
//import monero_config from '../../mymonero_libapp_js/mymonero-core-js/monero_utils/monero_config'
import monero_amount_format_utils from '../../mymonero_libapp_js/mymonero-core-js/monero_utils/monero_amount_format_utils'
//import documents from '../../DocumentPersister/DocumentPersister_Interface.js'
//import ListBaseController from '../../Lists/Controllers/ListBaseController'
//import commonComponents_emptyScreens from '../../MMAppUICommonComponents/emptyScreens.web'
import Utils from '../../Exchange/Javascript/ExchangeUtilityFunctions';
import ExchangeLibrary from 'mymonero-exchange';
//import ExchangeUtils from '../Javascript/ExchangeUtilityFunctions';
import ValidationLibrary from 'wallet-address-validator';

//let JSBigInt = BigIntLib.BigInteger;

class ExchangeContentView extends View {
    constructor(options, context) {
        
        
        super(options, context)
        const ecvSelf = this;
		let self = context;

        let orderTimerInterval = {};
        let orderStatusInterval = {};
		//
		let view = new View({}, self.context)
		const layer = view.layer
		const margin_side = 16
		const marginTop = 56
		layer.style.marginTop = `${marginTop}px`
		layer.style.marginLeft = margin_side + "px"
		layer.style.width = `calc(100% - ${2 * margin_side}px)`
		layer.style.height = `calc(100% - ${marginTop}px - 15px)`
		

        //ecvSelf._setup_emptyStateContainerView(context)
        ecvSelf._setup_views()
        ecvSelf.observerIsSet = false;

        let interval = setTimeout(function() {
            // if wallets exist, setup the wallet selector for the exchange page
            try {
                if (ecvSelf.context.wallets !== undefined) {
                    ecvSelf._setup_walletExchangeOptions(self.context);
                }
            } catch {
                // wallet not instantiated yet, no need to display notices
            }
            ecvSelf._refresh_sending_fee();
        }, 4000);
        ecvSelf.keepExchangeOptionsUpdated = interval;
    }

    

    _setup_walletExchangeOptions(context) {
        let self = this;
        let walletDiv = document.getElementById('wallet-selector');
        if (walletDiv === null) {
            return;
        }
        // if the user has selected a wallet, we update the balances for the    
        
        // get oldest wallet based on how wallets are inserted into wallets as a zero element, changing indexes backwards
        if (walletDiv.dataset.walletchosen == "true") {
            let selectedWallet = document.getElementById('selected-wallet');
            let selectorOffset = selectedWallet.dataset.walletoffset;
            let selectorInt = parseInt(selectorOffset);
            let wallet = self.context.wallets[selectorInt];
            let walletBalance = document.getElementById('selected-wallet-balance'); 
            walletBalance.innerText = `${self.UnlockedBalance_FormattedString(context.walletsListController.records[selectorOffset])} XMR   `;
        } else {
            let walletOptions = ``;
            let walletRecords = context.walletsListController.records;
            walletRecords.reverse();
            for (let i = 0; i < walletRecords.length; i++) {
                
                let wallet = walletRecords[i];
                let swatch = wallet.swatch.substr(1);
                walletOptions = walletOptions + `
                <div data-walletLabel="${wallet.walletLabel}" data-walletoffset="${i}" data-swatch="${swatch}" data-walletbalance="${self.UnlockedBalance_FormattedString(wallet)}" data-walletid="${wallet._id}" data-walletpublicaddress="${wallet.public_address}" class="hoverable-cell utility optionCell" style="word-break: break-all; height: 66px; position: relative; left: 0px; top: 0px; box-sizing: border-box; width: 100%;">                    
                    <div class="walletIcon medium-32" style="background-image: url('../../../assets/img/wallet-${swatch}@3x.png');"></div>                        
                    <div class="walletLabel">${wallet.walletLabel}</div>
                    <div class="description-label" style="position: relative; box-sizing: border-box; padding: 0px 38px 4px 66px; font-size: 13px; font-family: Native-Light, input, menlo, monospace; font-weight: 100; -webkit-font-smoothing: subpixel-antialiased; max-height: 32px; color: rgb(158, 156, 158); word-break: normal; overflow: hidden; text-overflow: ellipsis; cursor: default;">${self.UnlockedBalance_FormattedString(wallet)} XMR   </div>
                </div>
                `;
            }         
            //console.log('wallet html ran options '+i)
            // get oldest wallet based on how wallets are inserted into wallets as a zero element, changing indexes backwards
            let size = context.wallets.length;
            size = size - 1;
            let defaultOffset = 0;
            let defaultWallet = context.wallets[size];
            let walletSelectOptions = `
            <div data-walletoffset="0" data-walletpublicaddress="${defaultWallet.public_address}" data-walletLabel="${defaultWallet.walletLabel}" data-swatch="${defaultWallet.swatch.substr(1)}" data-walletbalance="${self.UnlockedBalance_FormattedString(defaultWallet)}" data-walletid="${defaultWallet._id}" id="selected-wallet" class="hoverable-cell utility selectionDisplayCellView" style="">
                    <div id="selected-wallet-icon" class="walletIcon medium-32" style="background-image: url('../../../assets/img/wallet-${defaultWallet.swatch.substr(1)}@3x.png')"></div>
                    <div id="selected-wallet-label" class="walletName">${defaultWallet.walletLabel}</div>
                    <div id="selected-wallet-balance" class="description-label">${self.UnlockedBalance_FormattedString(defaultWallet)} XMR   </div>
                </div>
                <div id="wallet-options" class="options_containerView">
                    <div class="options_cellViews_containerView" style="position: relative; left: 0px; top: 0px; width: 100%; height: 100%; z-index: 20; overflow-y: auto; max-height: 174.9px;">
                        ${walletOptions}
                    </div>
                </div>
            `;
            walletDiv.innerHTML = walletSelectOptions;
        }
    }

    _refresh_sending_fee() {
        const self = this;
        let tx_fee = document.getElementById('tx-fee');
        if (tx_fee !== null) {
            tx_fee.dataset.txFee = self._new_estimatedNetworkFee_displayString();
            tx_fee.innerHTML = `<span class="field_title form-field-title" style="margin-top: 8px; color: rgb(158, 156, 158); display: inline-block;">+ ${self._new_estimatedNetworkFee_displayString()} XMR EST. FEE</span>`;
        }
    }

    _setup_views() {
        // // to do -- clean up interval timers a bit.
        const self = this
        //super._setup_views()
        self._setup_emptyStateContainerView()
        self.observerIsSet = false;

        let interval = setInterval(function() {
            // if wallets exist, setup the wallet selector for the exchange page
            if (self.context.wallets !== undefined) {
                self._setup_walletExchangeOptions(self.context);
            }
            self._refresh_sending_fee();
        }, 4000);
        self.keepExchangeOptionsUpdated = interval; // we use a named interval attached to the view so that we can stop it if we ever want to;
    }
    
    _setup_emptyStateContainerView() {
        // TODO: wrap this in a promise so that we can execute logic after this
        const self = this;
        // We run this on an interval because of the way DOM elements are instantiated. Our Exchange DOM only renders once a user clicks the XMR->BTC menu tab
        let initialExchangeInit = setInterval(() => {
            let walletDiv = document.getElementById('wallet-selector');
            if (walletDiv !== null) {
                console.log(self.initialExchangeInit);
                clearInterval( self.initialExchangeInit ); 
                self._setup_walletExchangeOptions(self.context);
                console.log(self);
            }
        }, 2000);

        self.initialExchangeInit = initialExchangeInit;
        console.log(self);
        const view = new View({}, self.context)
        {
            const layer = view.layer
            layer.classList.add("emptyScreens")
            layer.classList.add("empty-page-panel")
            layer.style.border = "none";
            const explanatoryDiv = document.createElement("div");
            explanatoryDiv.classList.add("exchange-loading-message");
            explanatoryDiv.classList.add("form-field-title");
            explanatoryDiv.id = "explanatory-message";
            explanatoryDiv.innerHTML = `You can convert XMR to BTC here. Please wait while loading rates.`;
            view.layer.appendChild(explanatoryDiv);
        }
        
        var contentContainerLayer;
        {
            const layer = document.createElement("div");
            layer.classList.add("content-container")
            layer.classList.add("empty-page-content-container")
            layer.style.position = "relative";
            layer.id = "main-exchange-container";
            layer.style.display = "none";
            view.layer.appendChild(layer)
            contentContainerLayer = layer
            //layer.classList.add("xmr_input");
            let html = `
            <div class="exchangeScreen exchange-page-panel">
            <div class="content-container exchange-page-content-container">
                <div id="server-rates-messages"></div>
                <div id="loader" class="active">
                    
                </div>`
            layer.innerHTML = html;
        }

        // {
        //     const layer = document.createElement("div")
        //     layer.classList.add("message-label")
        //     layer.classList.add("exchangeRate")
        //     layer.id = "explanatory-message";
        //     layer.innerHTML = "You can exchange XMR to Bitcoin here.";
        //     //contentContainerLayer.appendChild(layer)
        // }
        
        {
            // Send Funds
            const layer = document.createElement("div");
            // we use ES6's spread operator (...buttonClasses) to invoke the addition of classes -- cleaner than a foreach
            let buttonClasses = ['base-button', 'hoverable-cell', 'navigation-blue-button-enabled', 'action', 'right-add-button', 'exchange-button'];
            layer.classList.add(...buttonClasses);  
            layer.id = "exchange-xmr";
            layer.innerText = "Exchange XMR";
            var orderSent = false;
            layer.addEventListener('click', function() {
                let exchangeXmrDiv = document.getElementById('exchange-xmr');
                exchangeXmrDiv.classList.remove('active');
                
                    /* 
                    * We define the status update and the response handling function here, since we need to update the DOM with status feedback from the monero-daemon. 
                    * We pass them as the final argument to ExchangeUtils.sendFunds
                    * It performs the necessary DOM-based status updates in this file so that we don't tightly couple DOM updates to a Utility module.
                    */
                    function validation_status_fn(str)
                    {

                        let monerodUpdates = document.getElementById('monerod-updates')
                        monerodUpdates.innerText = str;
                    }
                    /* 
                    * We perform the necessary DOM-based status updates in this file so that we don't tightly couple DOM updates to a Utility module.
                    */
                    function handle_response_fn(err, mockedTransaction)
                    {
                        let str;
                        let monerodUpdates = document.getElementById('monerod-updates');
                        if (err) {
                            str = typeof err === 'string' ? err : err.message;
                            monerodUpdates.innerText = str;
                            return
                        }
                        str = "Sent successfully.";
                        monerodUpdates.innerText = str;
                    }
                    // No cancel handler code since we don't provide a cancel method
                    function cancelled_fn() { // canceled_fn    
                        // No cancel handler code since we don't provide a cancel method 
                    }
                    /*
                    * We declare sendfunds here to have access to the context object
                    */

                function sendFunds(wallet, xmr_amount, xmr_send_address, sweep_wallet, validation_status_fn, handle_response_fn, context) {
                        console.log(context);
                        if (context.walletsListController.orderSent == true) {
                            console.log('Duplicate order');
                        } else {
                            try {
                                return new Promise((resolve, reject) => {
                                    context.walletsListController.orderSent = true;  

                                        let enteredAddressValue = xmr_send_address; //;
                                        let resolvedAddress = "";
                                        let manuallyEnteredPaymentID = "";
                                        let resolvedPaymentID = "";
                                        let hasPickedAContact = false;
                                        let manuallyEnteredPaymentID_fieldIsVisible = false;
                                        let resolvedPaymentID_fieldIsVisible = false;
                                        let resolvedAddress_fieldIsVisible = false;
                                        let contact_payment_id = undefined;
                                        let cached_OAResolved_address = undefined;
                                        let contact_hasOpenAliasAddress = undefined;
                                        let contact_address = undefined;
                                        let raw_amount_string = xmr_amount; // XMR amount in double
                                        let sweeping = sweep_wallet;
                                        let simple_priority = 1;
                                
                                        console.log("Sending from wallet:");
                                        console.log(wallet);
                                        resolve();
                                        wallet.SendFunds(
                                            enteredAddressValue,
                                            resolvedAddress,
                                            manuallyEnteredPaymentID,
                                            resolvedPaymentID,
                                            hasPickedAContact,
                                            resolvedAddress_fieldIsVisible,
                                            manuallyEnteredPaymentID_fieldIsVisible,
                                            resolvedPaymentID_fieldIsVisible,
                                            contact_payment_id,
                                            cached_OAResolved_address,
                                            contact_hasOpenAliasAddress,
                                            contact_address,
                                            raw_amount_string,
                                            sweeping,
                                            simple_priority,
                                            validation_status_fn,
                                            cancelled_fn,
                                            handle_response_fn
                                        );
                                    })
                                } catch (error) {
                                    context.walletsListController.orderSent = false;
                                    console.log(error);
                                }
                        } 
                    } // end of function
                
                let xmr_amount = document.getElementById('in_amount_remaining').innerHTML;
                let xmr_send_address = document.getElementById('receiving_subaddress').innerHTML;
                let xmr_amount_str = "" + xmr_amount;
                
                let selectedWallet = document.getElementById('selected-wallet');
                console.log(selectedWallet);
                let selectorOffset = selectedWallet.dataset.walletoffset;
                console.log(selectorOffset);
                let sweep_wallet = false; // TODO: Add sweeping functionality
                try {
                    console.log(self);
                    console.log(self.context);
                    if (self.context.walletsListController.hasOwnProperty('orderSent')) {
                        console.log('Order already sent previously');
                    } else {
                        self.context.walletsListController.orderSent = false;
                    }
                    sendFunds(self.context.walletsListController.records[selectorOffset], xmr_amount_str, xmr_send_address, sweep_wallet, validation_status_fn, handle_response_fn, self.context);
                } catch (error) {
                    console.log(error);
                }
            });


            contentContainerLayer.appendChild(layer);
        }
        {
            // let's make the xmr.to form in HTML for sanity's sake
            const layer = document.createElement("div");
            //layer.classList.add("xmr_input");
            let html = '    <div style="min-width: 300px">';
            //html += fs.readFileSync(__dirname + '/Body.html', 'utf8');
            html += `
            <div id="orderStatusPage">
            <div id="wallet-selector" class="WalletSelectView ListCustomSelectView form_field">
                        <!-- we insert this html dynamically from ECV.web.js -->
            </div>
            <div class="form_field" id="currency-table">
                <table class="full-width">
                    <tr>
                        <td>   
                            <div class="field_title form-field-title">XMR to send
                                <div style="position: relative; left: 0px; top: 0px; padding: 2px 0 0 0;">
                                    <span class="field_title form-field-title label-spacing" style="margin-top: 0px;">AMOUNT</span>
                                    <input id="XMRcurrencyInput" class="textInput currencyInput" type="text" placeholder="00.00" value="">
                                    <select id="currencySelect"><option value="XMR" style="text-align: center;">XMR</option></select>    
                                </div>
                            </div>
                        </td>
                        <td>
                            <div id="BTCInputDiv" class="field_title form-field-title">BTC you will receive
                                <div class="" style="position: relative; left: 0px; top: 0px; padding: 2px 0 0 0">
                                    <span class="field_title form-field-title label-spacing" style="margin-top: 0px;">AMOUNT</span>
                                    <input id="BTCcurrencyInput" class="textInput currencyInput" type="text" placeholder="00.00" value="">
                                    <select id="currencySelect"><option value="BTC" style="text-align: center;">BTC</option></select>    
                                </div>
                            </div>
                        </td>
                    </tr>
                    <input id="in_address" type="hidden" value="">
                </table>
            </div>
            <div class="form_field" id="tx-fee">
                    <span class="field_title form-field-title" style="margin-top: 8px; color: rgb(158, 156, 158); display: inline-block;">Loading ...</span>
                </div>
                
    
                <div class="form_field" id="btc-address">
                    <span class="field_title form-field-title" style="margin-top: 17px;">DESTINATION BITCOIN ADDRESS
                    </span>
                    <div class="contactPicker" style="position: relative; width: 100%; user-select: none;">
                        <input id="btcAddress" class="full-width longTextInput" type="text" placeholder="Destination BTC Address" autocomplete="off" autocapitalize="none" spellcheck="false" value="">
                    </div>
                </div>
            <div id="localmonero"><a href="#" id="localmonero-anchor" class="clickableLinkButton">Buy Monero using LocalMonero</a></div>
            <div id="indacoin"><a href="#" id="indacoin-anchor" class="clickableLinkButton">Buy Monero using Indacoin</a></div>
                <div id="validation-messages"></div>
                <div id="address-messages"></div>
                <div id="server-messages"></div>
    
            </div>
                    
            </div>
            <div id="order-status">
    
            </div>
        </div>
        <div id="exchangePage">
            <div class="field_title form-field-title">
                <table>
                    <tr>
                    <td colspan="2" style="word-wrap: normal; word-break: normal;">Please note an exchange may take a few minutes to process. <span class="provider-name"></span> are able to provide support for any exchanges. For all issues, please contact <span class="provider-name"></span> with your UUID for assistance.</td>
                    </tr>
                    <tr>
                        <td>
                            <div class="field_title form-field-title">
                                <div style="position: relative; left: 0px; top: 0px; padding: 2px 0 0 0;">
                                <span class="field_title form-field-title label-spacing uppercase" style="margin-top: 0px;"><span class="provider-name"></span> UUID</span>
                                    <div id="provider_order_id" class="textInput currencyOutput" type="text" placeholder="0.00"></div>
                                    <div class="currencySelect"><option value="XMR" style="text-align: center;">&nbsp;&nbsp;&nbsp;&nbsp;</option></select> 
                                </div>
                            </div>
                        </td>
                        <td>
                            <div class="field_title form-field-title uppercase">Time Remaining
                                <div id="clock">
                                    <span id="minutesRemaining"></span>
                                    <span>:</span>
                                    <span id="secondsRemaining"></span>
                                </div>
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <div class="field_title form-field-title">Remaining XMR payable
                                <div style="position: relative; left: 0px; top: 0px; padding: 2px 0 0 0;">
                                    <span class="field_title form-field-title label-spacing" style="margin-top: 0px;">AMOUNT</span>
                                    <div id="in_amount_remaining" class="textInput currencyOutput" type="text" placeholder="0.00">Loading</div>
                                    <div class="currencySelect"><option value="XMR" style="text-align: center;">XMR</option>    
                                </div>
                            </div>
                        </td>
                        <td>
                            <div class="field_title form-field-title">BTC to be paid out
                                <div class="" style="position: relative; left: 0px; top: 0px; padding: 2px 0 0 0">
                                    <span class="field_title form-field-title label-spacing" style="margin-top: 0px;">AMOUNT</span>
                                    <div id="out_amount" class="textInput currencyOutput" type="text">Loading</div>
                                    <div class="currencySelect"><option value="BTC" style="text-align: center;">BTC</option>    
                                </div>
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <div class="field_title form-field-title uppercase label-spacing">
                                <div class="" style="position: relative; left: 0px; top: 0px; padding: 2px 0 0 0">
                                    <span class="field_title form-field-title label-spacing" style="margin-top: 0px;">Order Status</span>
                                    <div class="order-status textInput currencyOutput" id="status"></div>
                                    <div class="currencySelect"><option value="XMR" style="text-align: center;">&nbsp;&nbsp;&nbsp;</option>
                                    </div>
                                </div>
                            </div>
                        </td>
                    </tr>
                </table>
            </div>
            <div class="field_title form-field-title hidden">
                    <table class="full-width" style="display: none;">
                        <tr>
                            <td>
                                <div class="field_title form-field-title">Receiving subaddress
                                    <div style="position: relative; left: 0px; top: 0px; padding: 2px 0 0 0;">
                                        <div id="receiving_subaddress" class="textInput currencyOutput" type="text">Loading</div>
                                    </div>
                                </div>
                            </td>
                        </tr>
                    </table>
            </div>
            <div id="monerod-updates" class="validationWindow">
    
            </div>
                <table class="hidden">
                    <tr>
                        <td>btc_amount_partial</td>
                        <td id="btc_amount_partial"> "0"</td>
                    </tr>
                    <tr>
                        <td>btc_dest_address</td>
                        <td id="in_address"> "2NBaUzuYqJvbThw77QVqq8NEXmkmDmSooy9"</td>
                    </tr>
    
                    <tr>
                        <td>expires_at</td>
                        <td id="expires_at"> "2020-08-07T13:54:30Z"</td>
                    </tr>
                    <tr>
                        <td>incoming_amount_total</td>
                        <td id="in_amount"> "1"</td>
                    </tr>
    
                    <tr>
                        <td>incoming_price_btc</td>
                        <td id="incoming_price_btc"> "0.00789659"</td>
                    </tr>
                    <tr>
                        <td>receiving_subaddress</td>
                        <td id="receiving_subaddress"> "72FsJzvGG4x97vvjwu9V6e8hBBfB3bhrqVEEoPsxrkjAVgQUnbA22cbgMmu5b4Lx6cQ75vnjPVs9HUB1L32yBMhaNsi7KrD"</td>
                    </tr>
                    <tr>
                        <td>remaining_amount_incoming</td>
                        <td id="remaining_amount_incoming"> "1"</td>
                    </tr>
                    <tr>
                        <td>uuid</td>
                        <td id="uuid"> "xmrto-NCXzGE"</td>
                    </tr>
                </table>            
            </div>
        </div>
    </div>
    `
            layer.innerHTML = html;
            console.log(layer);
            console.log(contentContainerLayer);

            contentContainerLayer.appendChild(layer);
        }

                    
        self.emptyStateMessageContainerView = view
        self.addSubview(view)

        let a = document.getElementById("server-invalid");


        let initialized = false;

        let exchangeInitTimer = setInterval((context, options) => {
            let loaderPage = document.getElementById('loader'); 
            if (typeof(loaderPage) == undefined) {
                return;
            }
            const ExchangeFunctions = new ExchangeLibrary();
            let order = {};
            let orderStatusResponse = {};
            let exchangeConfig = {};
            const exchangePage = document.getElementById('orderStatusPage');
            const btcAddressInput = document.getElementById("btcAddress");
            let walletSelector = document.getElementById('wallet-selector');
            let walletOptions = document.getElementById('wallet-options');
            let exchangeXmrDiv = document.getElementById('exchange-xmr');
            let orderStarted = false;
            let orderCreated = false;
            let orderStatusPage = document.getElementById("orderStatusPage");
            let backBtn = document.getElementsByClassName('nav-button-left-container')[0];
            //backBtn.style.display = "none";
            let addressValidation = document.getElementById('address-messages');
            let serverValidation = document.getElementById('server-messages');
            let explanatoryMessage = document.getElementById('explanatory-message');
            const selectedWallet = document.getElementById('selected-wallet');
            const serverRatesValidation = document.getElementById('server-rates-messages');
            const XMRcurrencyInput = document.getElementById('XMRcurrencyInput');
            const BTCcurrencyInput = document.getElementById('BTCcurrencyInput');
            const validationMessages = document.getElementById('validation-messages');   
            var orderBtn = document.getElementById("order-button");
            var orderTimer = {};
            let currencyInputTimer;
            let firstTick = true;
            let orderStatusDiv = document.getElementById("exchangePage");

            function validateBTCAddress(address, ValidationLibrary) {
                try {
                    if (ValidationLibrary.validate(address) == false) {
                        return false;
                    }
                } catch (Error) {
                    console.log(Error);
                }
                return true;
            }
            
            let BTCAddressInputListener = function() {
                let btcAddressInput = document.getElementById("btcAddress");
                addressValidation.innerHTML = "";

                if (validateBTCAddress(btcAddressInput.value, ValidationLibrary) == false) {
                        let error = document.createElement('div');
                        error.classList.add('message-label');
                        error.id = 'btc-invalid';
                        error.innerHTML = `Your BTC address is not valid.`;
                        addressValidation.appendChild(error);
                } 
                return;
            }

            let XMRCurrencyInputKeydownListener = function(event) {
                if (event.which == 8 || event.which == 110 || event.which == 46 || event.which == 190) 
                return;
            
                if ( (event.which >= 48 && event.which <= 57) || (event.which >= 96 && event.which <= 105) ) {
                    return;
                }
            
                if (!checkDecimals(XMRcurrencyInput.value, 12)) {
                    event.preventDefault();
                    return;
                }
            
                event.preventDefault();
                return;
            }

            let BTCCurrencyInputKeydownListener = function(event) {
                if (event.which == 8 || event.which == 110 || event.which == 46 || event.which == 190) 
                return;
            
                if ( (event.which >= 48 && event.which <= 57) || (event.which >= 96 && event.which <= 105) ) {
                    return;
                }
            
                if (!checkDecimals(BTCcurrencyInput.value, 8)) {
                    event.preventDefault();
                    return;
                }
            
                event.preventDefault();
                return;
            }

            let btcBalanceChecks = function() {
                
                let BTCToReceive;
                let BTCbalance = parseFloat(BTCcurrencyInput.value);
                let out_amount = BTCbalance.toFixed(12);
                XMRcurrencyInput.value = "Loading...";
                if (currencyInputTimer !== undefined) {
                    clearTimeout(currencyInputTimer);
                }
            
                // if (ExchangeFunctions.currentRates.out_min > BTCbalance) {
                //     let error = document.createElement('div');
                //     error.classList.add('message-label');
                //     error.id = 'xmrexceeded';
                //     error.innerHTML = `You cannot exchange less than ${ExchangeFunctions.currentRates.out_min} BTC`;
                //     validationMessages.appendChild(error);
                //     return;
                // }
                // if (ExchangeFunctions.currentRates.out_max < BTCbalance) {
                //     let error = document.createElement('div');
                //     error.classList.add('message-label');
                //     error.id = 'xmrexceeded';
                //     error.innerHTML = `You cannot exchange more than ${ExchangeFunctions.currentRates.out_max} BTC`;
                //     validationMessages.appendChild(error);
                //     return;
                // }
                validationMessages.innerHTML = "";
                serverValidation.innerHTML = "";
                currencyInputTimer = setTimeout(() => {
                    ExchangeFunctions.getOfferWithOutAmount(ExchangeFunctions.in_currency, ExchangeFunctions.out_currency, out_amount)
                        .then((response) => {
                            let XMRtoReceive = parseFloat(response.in_amount);
                            let selectedWallet = document.getElementById('selected-wallet');
                            let tx_feeElem = document.getElementById('tx-fee');
                            let tx_fee = tx_feeElem.dataset.txFee;
                            let tx_fee_double = parseFloat(tx_fee);
                            let walletMaxSpendDouble = parseFloat(selectedWallet.dataset.walletbalance);
                            let walletMaxSpend = walletMaxSpendDouble - tx_fee;
                            //let BTCToReceive = XMRcurrencyInput.value * exchangeFunctions.currentRates.price;
                            //let XMRbalance = parseFloat(XMRcurrencyInput.value);
                            let BTCCurrencyValue = parseFloat(BTCcurrencyInput.value);
            
            
                            if ((walletMaxSpend - XMRtoReceive) < 0) {
                                let error = document.createElement('div');
                                error.classList.add('message-label');
                                error.id = 'xmrexceeded';
                                error.innerHTML = `You cannot exchange more than ${walletMaxSpend} XMR`;
                                validationMessages.appendChild(error);
                            }
            
                            if (BTCCurrencyValue.toFixed(12) > ExchangeFunctions.currentRates.upper_limit) {
                                let error = document.createElement('div');
                                error.id = 'xmrexceeded';
                                error.classList.add('message-label');
                                let btc_amount = parseFloat(ExchangeFunctions.currentRates.upper_limit);
                                error.innerHTML = `You cannot exchange more than ${btc_amount} BTC.`;
                                validationMessages.appendChild(error);
                            }
                            if (BTCCurrencyValue.toFixed(8) < ExchangeFunctions.currentRates.lower_limit) {
                                let error = document.createElement('div');
                                error.id = 'xmrtoolow';
                                error.classList.add('message-label');
                                let btc_amount = parseFloat(ExchangeFunctions.currentRates.lower_limit);
                                error.innerHTML = `You cannot exchange less than ${btc_amount} BTC.`;
                                validationMessages.appendChild(error);
                            }
                            XMRcurrencyInput.value = XMRtoReceive.toFixed(12);
                        }).catch((error) => {
                            let errorDiv = document.createElement('div');
                            errorDiv.classList.add('message-label');
                            errorDiv.id = 'server-invalid';
                            errorDiv.innerHTML = `There was a problem communicating with the server. <br>If this problem keeps occurring, please contact support with a screenshot of the following error: <br>` + error.message;
                            serverValidation.appendChild(errorDiv);
                        });
                }, 1500);
            }

            function clearCurrencies() {
                XMRcurrencyInput.value = "";
                BTCcurrencyInput.value = "";
            }

            let walletSelectorClickListener = function(event) {
                let walletElement = document.getElementById('wallet-options');
                let selectedWallet = document.getElementById('selected-wallet');
                walletElement.classList.add('active');
                if (event.srcElement.parentElement.className.includes("optionCell")) {
                    
                    let dataAttributes = event.srcElement.parentElement.dataset;
                    selectedWallet.dataset.walletlabel = dataAttributes.walletlabel;
                    selectedWallet.dataset.walletbalance = dataAttributes.walletbalance;
                    selectedWallet.dataset.swatch = dataAttributes.swatch;
                    selectedWallet.dataset.walletselected = true;
                    selectedWallet.dataset.walletoffset = dataAttributes.walletoffset;
                    let walletLabel = document.getElementById('selected-wallet-label'); 
                    let walletBalance = document.getElementById('selected-wallet-balance'); 
                    let walletIcon = document.getElementById('selected-wallet-icon'); 
                    walletElement.classList.remove('active');
                    walletIcon.style.backgroundImage = `url('../../../assets/img/wallet-${dataAttributes.swatch}@3x.png'`;
                    walletLabel.innerText = dataAttributes.walletlabel;
                    walletBalance.innerText = dataAttributes.walletbalance + " XMR   ";
                    let walletSelector = document.getElementById('wallet-selector');
                    walletSelector.dataset.walletchosen = true;
                    clearCurrencies();
                }
                if (event.srcElement.parentElement.className.includes("selectionDisplayCellView")) {
                    walletElement.classList.add('active');
                }
                if (event.srcElement == 'div.hoverable-cell.utility.selectionDisplayCellView') {
                    
                } 
            }

            let xmrBalanceChecks = function() {
                
                serverValidation.innerHTML = "";
                let BTCToReceive;
                let XMRbalance = parseFloat(XMRcurrencyInput.value);
                let in_amount = XMRbalance.toFixed(12);
                BTCcurrencyInput.value = "Loading...";
                if (currencyInputTimer !== undefined) {
                    clearTimeout(currencyInputTimer);
                }
                // if (ExchangeFunctions.currentRates.in_min > XMRbalance) {
                //     let error = document.createElement('div');
                //     error.classList.add('message-label');
                //     error.id = 'xmrexceeded';
                //     error.innerHTML = `You cannot exchange less than ${ExchangeFunctions.currentRates.in_min} XMR`;
                //     validationMessages.appendChild(error);
                //     return;
                // }
                // if (ExchangeFunctions.currentRates.in_max < XMRbalance) {
                //     let error = document.createElement('div');
                //     error.classList.add('message-label');
                //     error.id = 'xmrexceeded';
                //     error.innerHTML = `You cannot exchange more than ${ExchangeFunctions.currentRates.in_max} XMR`;
                //     validationMessages.appendChild(error);
                //     return;
                // }
                validationMessages.innerHTML = "";
                serverValidation.innerHTML = "";
                currencyInputTimer = setTimeout(() => {
                    ExchangeFunctions.getOfferWithInAmount(ExchangeFunctions.in_currency, ExchangeFunctions.out_currency, in_amount)
                        .then((response) => {
                            
                            BTCToReceive = parseFloat(response.out_amount);
                            let selectedWallet = document.getElementById('selected-wallet');
                            let tx_feeElem = document.getElementById('tx-fee');
                            let tx_fee = tx_feeElem.dataset.txFee;
                            let tx_fee_double = parseFloat(tx_fee);
                            let walletMaxSpendDouble = parseFloat(selectedWallet.dataset.walletbalance);
                            let walletMaxSpend = walletMaxSpendDouble - tx_fee;
                            
                            if ((walletMaxSpend - XMRbalance) < 0) {
                                let error = document.createElement('div');
                                error.classList.add('message-label');
                                error.id = 'xmrexceeded';
                                error.innerHTML = `You cannot exchange more than ${walletMaxSpend} XMR`;
                                validationMessages.appendChild(error);
                            }
                            if (BTCToReceive.toFixed(8) > ExchangeFunctions.currentRates.out_max) {
                                let error = document.createElement('div');
                                error.classList.add('message-label');
                                error.id = 'xmrexceeded';
                                error.innerHTML = `You cannot exchange more than ${ExchangeFunctions.currentRates.in_max.toFixed(12)} XMR`;
                                validationMessages.appendChild(error);
                            }
                            if (BTCToReceive.toFixed(8) < ExchangeFunctions.currentRates.lower_limit) {
                                let error = document.createElement('div');
                                error.classList.add('message-label');
                                error.id = 'xmrtoolow';
                                error.innerHTML = `You cannot exchange less than ${ExchangeFunctions.currentRates.in_min.toFixed(12)} XMR.`;
                                validationMessages.appendChild(error);
                            }
                            BTCcurrencyInput.value = BTCToReceive.toFixed(8);
                        }).catch((error) => {
                            let errorDiv = document.createElement('div');
                            errorDiv.classList.add('message-label');
                            errorDiv.id = 'server-invalid';
                            errorDiv.innerHTML = `There was a problem communicating with the server. <br>If this problem keeps occurring, please contact support with a screenshot of the following error: <br>` + error.message;
                            serverValidation.appendChild(errorDiv);
                        });
                }, 1500);
            }

            function renderOrderStatus(order) {    
                return new Promise((resolve, reject) => {
                    let idArr = [
                        "in_amount_remaining",
                        "out_amount",
                        "status",
                        "expires_at",
                        "provider_order_id",
                        "in_address",
                        "in_amount"
                    ];
                
                    let test = document.getElementById('exchangePage');
                    if (!(test == null)) {
                        idArr.forEach((item, index) => {
                            if (item == "in_address") {
                                document.getElementById('receiving_subaddress').innerHTML = order[item];
                            } else {
                                document.getElementById(item).innerHTML = order[item];
                            }
                            
                        });
                    }
                    resolve();
                })
            }

            function getRates() {


                serverRatesValidation.innerHTML = "";
                let retry = document.getElementById('retry-rates');
                let errorDiv = document.getElementById('retry-error');
                let orderBtn = document.getElementById('order-button');
                let explanatoryMessage = document.getElementById('explanatory-message');
                
                if (retry !== null) {
                    retry.classList.add('hidden');
                    errorDiv.classList.add('hidden');
                }

                let indacoinDiv = document.getElementById("indacoin");
                let localmoneroDiv = document.getElementById("localmonero");

                function openClickableLink() {
                    const self = this;
                    let referrer_id = self.getAttribute("referrer_id");
                    let url = self.getAttribute("url");
                    let paramStr = self.getAttribute("param_str");
                    if (referrer_id.length > 0) {
                        console.log("Got a referrer -- generate custom URL");
                        let urlToOpen = url + "?" + paramStr + "=" + referrer_id;
                        window.open(urlToOpen);
                    } else {
                        console.log("No referrer");
                        window.open("https://localmonero.co");
                    }
                }

                ExchangeFunctions.initialiseExchangeConfiguration().then((response) => {
                    // Data returned by resolve
                    let localmoneroAnchor = document.getElementById('localmonero-anchor');
                    // let indacoinAnchor = document.getElementById('indacoin-anchor');
                    
                    // indacoinAnchor.setAttribute("url", "https://indacoin.com/");
                    // indacoinAnchor.setAttribute("referrer_id", response.referrer_info.indacoin.referrer_id)
                    // indacoinAnchor.setAttribute("param_str", "");

                    localmoneroAnchor.setAttribute("referrer_id", response.data.referrer_info.localmonero.referrer_id)
                    localmoneroAnchor.setAttribute("url", "https://localmonero.co")
                    localmoneroAnchor.setAttribute("param_str", "rc");
                    
                    
                    // if (response.referrer_info.indacoin.enabled === true) {
                    //     indacoinDiv.style.display = "block";
                    //     indacoinAnchor.addEventListener('click', openClickableLink);
                    // }
                    if (response.data.referrer_info.localmonero.enabled === true) {
                        localmoneroDiv.style.display = "block";
                        localmoneroAnchor.addEventListener('click', openClickableLink);
                    }
                }).catch(error => {
                    let localmoneroAnchor = document.getElementById('localmonero-anchor');
                    
                    localmoneroAnchor.setAttribute("referrer_id", "h2t1")
                    localmoneroAnchor.setAttribute("url", "https://localmonero.co")
                    localmoneroAnchor.setAttribute("param_str", "rc");
                    // No data received from promise resolve(). Display link for LocalMonero
                    localmoneroDiv.style.display = "block";
                    localmoneroAnchor.addEventListener('click', openClickableLink);
                });
                
                ExchangeFunctions.getRatesAndLimits().then(() => {
                    loaderPage.classList.remove('active');
                    exchangePage.classList.add("active");
                    let mainContainer = document.getElementById("main-exchange-container");
                    mainContainer.style.display = "block";
                    backBtn.style.display = "none";
                    orderBtn.style.display = "block";
                    explanatoryMessage.style.display = "none";
                }).catch((error) => {
                    if (retry !== null) {
                        retry.classList.remove('hidden');
                        errorDiv.classList.remove('hidden');
                    } else {            
                        // KB: Remove this ---
                        
                        // end remove

                        let errorDiv = document.createElement('div');
                        errorDiv.innerText = "There was a problem with retrieving rates from the server. Please click the 'Retry' button to try connect again. The error message was: " + error.message;
                        errorDiv.id = "retry-error";
                        errorDiv.classList.add('message-label');
                        let retryBtn = document.createElement('div');
                        retryBtn.id = "retry-rates";
                        retryBtn.classList.add('base-button');
                        retryBtn.classList.add('hoverable-cell'); 
                        retryBtn.classList.add('navigation-blue-button-enabled');
                        retryBtn.classList.add('action');
                        retryBtn.innerHTML = "Retry";
                        retryBtn.addEventListener('click', getRates);
                        explanatoryMessage.appendChild(errorDiv);
                        explanatoryMessage.appendChild(retryBtn);
                    }
                });
            }

function renderOrderStatus(order) {    

/*

        "btc_amount",
        "btc_amount_partial",
        "btc_dest_address",
        "btc_num_confirmations_threshold",
        "created_at",
        "in_amount_remaining",
        "out_amount",
        "status",
        "expires_at",
        "incoming_amount_total",
        "incoming_num_confirmations_remaining",
        "incoming_price_btc",
        "receiving_subaddress",
        "recommended_mixin",
        "remaining_amount_incoming",
        "seconds_till_timeout",
        "state",
        "uses_lightning",
        "uuid"
        "provider_order_id"

*/


    let idArr = [
        "in_amount_remaining",
        "out_amount",
        "status",
        "expires_at",
        "provider_order_id",
        "in_address",
        "in_amount"
    ];

    let test = document.getElementById('exchangePage');
    if (!(test == null)) {
        idArr.forEach((item, index) => {
            if (item == "in_address") {
                document.getElementById('receiving_subaddress').innerHTML = order[item];
            } else {
                document.getElementById(item).innerHTML = order[item];
            }
            
        });
    }
}

    function getTimeRemaining(endtime){
        let total = Date.parse(endtime) - Date.parse(new Date());
        let seconds = Math.floor( (total/1000) % 60 );
        let minutes = Math.floor( (total/1000/60) % 60 );
        let hours = Math.floor( (total/(1000*60*60)) % 24 );
        let days = Math.floor( total/(1000*60*60*24) );
        
        if (total < 0) {
            seconds = 0;
            minutes = 0;
        }

        return {
          total,
          days,
          hours,
          minutes,
          seconds
        };
    }

    function checkDecimals(value, decimals) {
        let str = value.toString();
        let strArr = str.split('.');
        if (strArr.length > 1) {
            if (strArr[1].length >= decimals) {
                return false;
            }
        }
        return true;
    }

    function isValidBase10Decimal(number) {
        let str = number.toString();
        let strArr = str.split('.');
        if (strArr.size > 1 && typeof(strArr) == Array) {
            return false;
        }
        for (let i = 0; i < 2; i++) {
            if (isNaN(parseInt(strArr[i]))) {
                return false;
            }
        }
        if (strArr.size > 1) {
            if (strArr[1].length == 0) {
                return false;
            }
        }
        return true;
    }            

    function backButtonClickListener() {
        let backBtn = document.getElementsByClassName('nav-button-left-container')[0];
        let viewOrderBtn = document.getElementById('view-order');
        orderCreated = false;
        document.getElementById("orderStatusPage").classList.add('active');
        backBtn.style.display = "none";
        let orderStatusDiv = document.getElementById("exchangePage");
        loaderPage.classList.remove('active');
        orderStatusDiv.classList.remove('active');
        exchangeXmrDiv.classList.remove('active');
        viewOrderBtn.style.display = "block";
    }

    function orderBtnClicked() {
        let validationError = false;
        serverValidation.innerHTML = "";
        if (orderStarted == true) {
            return;
        } 
        if (validationMessages.firstChild !== null) {
            validationMessages.firstChild.style.color = "#ff0000";
            validationError = true;
            return;
        }
        if (addressValidation.firstChild !== null) {
            addressValidation.firstChild.style.color = "#ff0000";
            validationError = true;
            return;
        }
        let btc_dest_address = document.getElementById('btcAddress').value;
        
        orderBtn.style.display = "none";
        orderStarted = true;
        //backBtn.style.display = "block";
        loaderPage.classList.add('active');
        let orderStatusResponse = { orderTick: 0 };
        let out_amount = document.getElementById('BTCcurrencyInput').value;
        let in_currency = 'XMR';
        let out_currency = 'BTC';
        try {
            let offer = ExchangeFunctions.getOfferWithOutAmount(in_currency, out_currency, out_amount).then((response) => {
                let selectedWallet = document.getElementById('selected-wallet');
                ExchangeFunctions.createOrder(btc_dest_address, selectedWallet.dataset.walletpublicaddress).then((response) => {
                    let orderStatusDiv = document.getElementById("exchangePage");
                    document.getElementById("orderStatusPage").classList.remove('active');
                    loaderPage.classList.remove('active');
                    orderStatusDiv.classList.add('active');
                    exchangeXmrDiv.classList.add('active');
                    backBtn.innerHTML = `<div class="base-button hoverable-cell utility grey-menu-button disableable left-back-button" style="cursor: default; -webkit-app-region: no-drag; position: absolute; opacity: 1; left: 0px;"></div>`;
                    let localOrderTimer = setInterval(() => {
                        if (orderStatusResponse.hasOwnProperty('expires_at')) {
                            orderStatusResponse.orderTick++;
                            Utils.renderOrderStatus(orderStatusResponse);
                            let expiryTime = orderStatusResponse.expires_at;
                            let secondsElement = document.getElementById('secondsRemaining');
                            let minutesElement = document.getElementById('minutesRemaining');
                            if (secondsElement !== null) {
                                
                                let minutesElement = document.getElementById('minutesRemaining');
                                let timeRemaining = Utils.getTimeRemaining(expiryTime);
                                minutesElement.innerHTML = timeRemaining.minutes;
                                if (timeRemaining.seconds <= 9) {
                                    timeRemaining.seconds = "0" + timeRemaining.seconds;
                                }
                                secondsElement.innerHTML = timeRemaining.seconds;
                                let xmr_dest_address_elem = document.getElementById('in_address');
                                xmr_dest_address_elem.value = response.receiving_subaddress; 
                            }

                            if (orderStatusResponse.status == "PAID" || orderStatusResponse.status == "TIMED_OUT"
                                || orderStatusResponse.status == "DONE" || orderStatusResponse.status == "FLAGGED_DESTINATION_ADDRESS"
                                || orderStatusResponse.status == "PAYMENT_FAILED" || orderStatusResponse.status == "REJECTED" 
                                || orderStatusResponse.status == "EXPIRED") 
                                {
                                    clearInterval(localOrderTimer);
                                }
                        }
                        if ((orderStatusResponse.orderTick % 10) == 0) {
                            ExchangeFunctions.getOrderStatus().then(function (response) {
                                let elemArr = document.getElementsByClassName("provider-name");
                                if (firstTick == true || elemArr[0].innerHTML == 'undefined') {
                                    Utils.renderOrderStatus(response);
                                    elemArr[0].innerHTML = response.provider_name;
                                    elemArr[1].innerHTML = response.provider_name;
                                    elemArr[2].innerHTML = response.provider_name;
                                    
                                    firstTick = false;
                                }
                                let orderTick = orderStatusResponse.orderTick;
                                orderTick++;
                                response.orderTick = orderTick;
                                orderStatusResponse = response;
                            })
                        }
                    }, 1000);
                    // orderStatusInterval = setInterval((response) => {
                    //     console.log(orderTimer);
                    //     clearInterval(orderStatusInterval);
                    //     clearInterval(orderTimerInterval);
                    //     renderOrderStatus(orderStatusResponse).then(() => {
                    //         console.log(orderTimer);
                    //         // if (orderStatusResponse.status == "PAID" || orderStatusResponse.status == "TIMED_OUT"
                    //         //     || orderStatusResponse.status == "DONE" || orderStatusResponse.status == "FLAGGED_DESTINATION_ADDRESS"
                    //         //     || orderStatusResponse.status == "PAYMENT_FAILED" || orderStatusResponse.status == "REJECTED") 
                    //             {
                    //                 console.log("Try clear intervals");
                    //                 clearInterval(orderStatusInterval);
                    //                 clearInterval(orderTimerInterval);
                    //         }
                    //     });
                    // }, 10000);
                    document.getElementById("orderStatusPage").classList.remove('active');
                    loaderPage.classList.remove('active');
                    orderStatusDiv.classList.add('active');
                    exchangeXmrDiv.classList.add('active');
                }).catch((error) => {
                    let errorDiv = document.createElement('div');
                    errorDiv.classList.add('message-label');
                    errorDiv.id = 'server-invalid';
                    errorDiv.innerHTML = `There was a problem communicating with the server. <br>If this problem keeps occurring, please contact support with a screenshot of the following error: <br>` + error;
                    serverValidation.appendChild(errorDiv);
                    orderBtn.style.display = "block";
                    orderStarted = false;
                })
            }).catch((error) => {
                let errorDiv = document.createElement('div');
                errorDiv.classList.add('message-label');
                errorDiv.id = 'server-invalid';
                errorDiv.innerHTML = `There was a problem communicating with the server. <br>If this problem keeps occurring, please contact support with a screenshot of the following error: <br>` + error;
                serverValidation.appendChild(errorDiv);
                orderBtn.style.display = "block";
                orderStarted = false;
            });
        } catch (Error) {
            console.log(Error);
        }
    }
            let exchangeRendered = document.getElementById('orderStatusPage'); 
            if (exchangeRendered == null) {
                return;
            } else {
                
                btcAddressInput.addEventListener('input', BTCAddressInputListener);
                XMRcurrencyInput.addEventListener('keydown', XMRCurrencyInputKeydownListener);
                BTCcurrencyInput.addEventListener('keydown', BTCCurrencyInputKeydownListener);
                walletSelector.addEventListener('click', walletSelectorClickListener);
                orderBtn.addEventListener('click', orderBtnClicked);
                backBtn.addEventListener('click', backButtonClickListener);
                            
                BTCcurrencyInput.addEventListener('keyup', function(event) {
                    validationMessages.innerHTML = '';
                    if (BTCcurrencyInput.value.length > 0) {
                        btcBalanceChecks();            
                    }
                });            

                XMRcurrencyInput.addEventListener('keyup', function(event) {
                    validationMessages.innerHTML = '';
                    if (XMRcurrencyInput.value.length > 0) {
                        xmrBalanceChecks();            
                    }
                });
                getRates();

                clearInterval(exchangeInitTimer);
                initialized = true;
            }
        }, 5000);
    }

    Balance_JSBigInt(wallet)
    {
        const self = this;
        var total_received = wallet.total_received
        var total_sent = wallet.total_sent
        if (typeof total_received === 'undefined') {
            total_received = new JSBigInt(0) // patch up to avoid crash as this doesn't need to be fatal
        }
        if (typeof total_sent === 'undefined') {
            total_sent = new JSBigInt(0) // patch up to avoid crash as this doesn't need to be fatal
        }
        const balance_JSBigInt = total_received.subtract(total_sent)
        if (balance_JSBigInt.compare(0) < 0) {
            return new JSBigInt(0)
        }
        return balance_JSBigInt
    }
    UnlockedBalance_FormattedString(wallet)
	{ // provided for convenience mainly so consumers don't have to require monero_utils
        let self = this;
		let balance_JSBigInt = self.UnlockedBalance_JSBigInt(wallet);
		return monero_amount_format_utils.formatMoney(balance_JSBigInt) 
	}
    Balance_FormattedString(wallet)
	{ // provided for convenience mainly so consumers don't have to require monero_utils
        let self = this;
		let balance_JSBigInt = self.Balance_JSBigInt(wallet);
		return monero_amount_format_utils.formatMoney(balance_JSBigInt) 
	}
	Balance_DoubleNumber(wallet)
	{
		let self = wallet;
		return parseFloat(self.Balance_FormattedString()) // is this appropriate and safe?
	}
	UnlockedBalance_JSBigInt(wallet)
	{
		let self = wallet;
		const difference = self.Balance_JSBigInt().subtract(
			self.locked_balance || new JSBigInt(0)
		)
		if (difference.compare(0) < 0) {
			//return new JSBigInt(0)
		}
		return difference
	}
	LockedBalance_JSBigInt(wallet)
	{
		let self = wallet;
		var lockedBalance_JSBigInt = self.locked_balance
		if (typeof lockedBalance_JSBigInt === 'undefined') {
			//lockedBalance_JSBigInt = new JSBigInt(0)
		}
		//
		return lockedBalance_JSBigInt
	}
	LockedBalance_FormattedString()
	{ // provided for convenience mainly so consumers don't have to require monero_utils
		let self = this
		let lockedBalance_JSBigInt = self.LockedBalance_JSBigInt()
		//
		return monero_amount_format_utils.formatMoney(lockedBalance_JSBigInt)
	}
	LockedBalance_DoubleNumber()
	{
		let self = this
		return parseFloat(self.LockedBalance_FormattedString()) // is this appropriate and safe?
    }
    
	new_xmr_estFeeAmount() 
	{
		const self = this
		const estimatedNetworkFee_JSBigInt = new JSBigInt(self.context.monero_utils.estimated_tx_network_fee(
			null, // deprecated - will be removed soon
			1,
			"24658" // TODO: grab this from wallet via API request
		))
		const estimatedTotalFee_JSBigInt = estimatedNetworkFee_JSBigInt // no tx hosting service fee
		//
		return estimatedTotalFee_JSBigInt
	}

    _new_estimatedNetworkFee_displayString()
	{
		const self = this
		const estimatedTotalFee_JSBigInt = self.new_xmr_estFeeAmount()
		const estimatedTotalFee_str = monero_amount_format_utils.formatMoney(estimatedTotalFee_JSBigInt)
		const estimatedTotalFee_moneroAmountDouble = parseFloat(estimatedTotalFee_str)
		
		// const estimatedTotalFee_moneroAmountDouble = 0.028
		// Just hard-coding this to a reasonable estimate for now as the fee estimator algo uses the median blocksize which results in an estimate about twice what it should be
		let displayCcySymbol = self.context.settingsController.displayCcySymbol
		let finalizable_ccySymbol = displayCcySymbol
		var finalizable_formattedAmountString = estimatedTotalFee_str;//`${estimatedTotalFee_moneroAmountDouble}`
		let final_formattedAmountString = finalizable_formattedAmountString
		let final_ccySymbol = "XMR";
		let displayString = `${final_formattedAmountString}`
		//
		return displayString
	}

/**
 *                 let exchangeRate = document.getElementById('exchangeRate');
                
                exchangeRate.addEventListener('click', function() {
                    const rateObj = await ExchangeFunctions.getRatesAndLimits();
                    console.log(rateObj);
                })
*/
    Navigation_Title() {
        return "Exchange"
    }

    Navigation_New_RightBarButtonView()
    {
        const self = this
        //
        const view = commonComponents_navigationBarButtons.New_RightSide_AddButtonView(self.context)
        //const view = _New_ButtonBase_View(context)
        const layer = view.layer
        { // setup/style
            layer.href = "" // to make it non-clickable -- KB: Or you could event.preventDefault..., like sane people?
            layer.innerHTML = "Create Order";
            layer.id = "order-button"
            layer.classList.add('exchange-button')
            layer.classList.add('base-button'); 
            layer.classList.add('hoverable-cell'); 
            layer.classList.add('navigation-blue-button-enabled'); 
            layer.classList.add('action'); 
            layer.style.display = "none";
            if (typeof process !== 'undefined' && process.platform === "linux") {
                layer.style.fontWeight = "700" // surprisingly does not render well w/o this… not linux thing but font size thing. would be nice to know which font it uses and toggle accordingly. platform is best guess for now
            } else {
                layer.style.fontWeight = "300"
                }
            }

            
            // view.layer.addEventListener(
            //     "click",
            //     function(e)
            //     {
            //         e.preventDefault()
            //         //
            //         let orderElement = document.getElementById("")    
            //         //
            //         // const view = new AddContactFromContactsTabView({}, self.context)
            //         // self.currentlyPresented_AddContactView = view
            //         // const navigationView = new StackAndModalNavigationView({}, self.context)
            //         // navigationView.SetStackViews([ view ])
            //         // self.navigationController.PresentView(navigationView, true)
            //         //
            //         return false
            //     }
            // )
            return view
        }
    }



export default ExchangeContentView
