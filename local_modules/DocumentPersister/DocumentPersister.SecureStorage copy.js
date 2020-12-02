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
//
//const async = require('async')
//
//
import 'capacitor-secure-storage-plugin';
import { Plugins } from '@capacitor/core';
const { SecureStoragePlugin } = Plugins; // Initialises the Secure Storage Capacitor plugin
////console.log(SecureStoragePlugin);

import DocumentPersister_Interface from './DocumentPersister_Interface';
import { reject } from 'async';
//
class DocumentPersister extends DocumentPersister_Interface
{
	constructor(options)
	{
		super(options) // must call on super before accessing options
		//
		const self = this
		options = self.options
		//
		self.store = {}
	}
	//
	// Runtime - InMemory - Accessors
	___lazy_writable_collectionStringsById(collectionName)
	{
		//console.log("SecureStorage: invoked ___lazy_writable_collectionStringsById");
		const self = this
		var collectionStringsById = self.store[collectionName] || null
		if (typeof collectionStringsById == 'undefined' || !collectionStringsById) {
			collectionStringsById = {}
			self.store[collectionName] = collectionStringsById
		}
		if (typeof collectionStringsById == 'undefined' || !collectionStringsById) {
			throw "expected non-nil collectionStringsById"
		}
		return collectionStringsById
	}
	//
	//
	// Runtime - Accessors - Interface - Overrides
	//
	__documentContentStringsWithIds(collectionName, ids, fn)
	{
		//console.log("SecureStorage: invoked __documentContentStringsWithIds");
		const self = this
		const collectionStringsById = self.store[collectionName] || {}
		const ids_length = ids.length
		const stringsWithIds = []
		for (var i = 0 ; i < ids_length ; i++) {
			const id = ids[i]
			const stringWithId = collectionStringsById[id] || null
			if (stringWithId != null) {
				stringsWithIds.push(stringWithId)
			}
		}
		setTimeout(function() { // maintain async
			fn(null, stringsWithIds)
		})
	}
	__idsOfAllDocuments(collectionName, fn)
	{
		//console.log("SecureStorage: invoked __idsOfAllDocuments");
		const self = this
		const collectionStringsById = self.store[collectionName] || {}
		const ids = Object.keys(collectionStringsById)
		setTimeout(function() { // maintain async
			fn(null, ids)
		})
	}
	__allDocuments(collectionName, fn)
	{
		console.log("SecureStorage: invoked __allDocuments");
		console.log(collectionName);
		const self = this;
		try {
			console.log("first get indexObj");
			//self.getIndexObj(); // This is a promise
			let parameters = {
				collectionName, fn
			}
			
			const indexObjData = self.getIndexObj().then((returnData) => {
				console.log("IndexObj returned")
				console.log(parameters);
				console.log(returnData);
				console.log(typeof(returnData));
				let returnArray = [];
				
				returnArray = returnData.filter(key => key.includes(parameters.collectionName));
				console.log(returnArray);
				
				let promiseArr = [];
				for (i = 0; i < returnArray.length; i++) {
					let keyStr = returnArray[i].substr(8)
					let promiseParameters = {
						key: keyStr
					}
					console.log(promiseParameters);
					promiseArr[i] = SecureStoragePlugin.get(promiseParameters)
				}
				
				Promise.all(promiseArr).then(function(data, parameters) {
					console.log("All promises returned successfully");
					console.log(data);
					console.log(parameters);
					let returnArr = []
					for (i = 0; i < data.length; i++) {
						console.log("Json parse this:")
						console.log(data[i].value)
						try {
							let decodedStr = JSON.parse(data[i].value);
							console.log(decodedStr);
							console.log(decodedStr.appTimeoutAfterS);
							let returnObj = {
								id: parameters.collectionName + decodedStr._id,
								value: decodedStr
							}
							console.log(returnObj);
						} catch (error) {
							console.log("We had an error decoding one of the values");
						}
					}
				 
				
					console.log(data);
					parameters.fn(null, data);
				}).catch((error) => {
					console.log("error");
					console.log(error);
				})

				

				// console.log(returnData);
				// let options = {
				// 	key: collectionName
				// }
				// console.log("IdsOfcOllectionObjs");
				// let idsOfCollectionObjs = returnData[collectionName];
				// console.log(idsOfCollectionObjs);
				// let returnObjArray = [];
				// let promiseArr = [];
				// for (i = 0; i < idsOfCollectionObjs.length; i++) {
				// 	let promiseParameters = {
				// 		key: idsOfCollectionObjs[i]
				// 	}
				// 	console.log(promiseParameters);
				// 	promiseArr[i] = SecureStoragePlugin.get(promiseParameters);
				// }
				// console.log("Promise array");
				// console.log(promiseArr);
				// Promise.all(promiseArr).then((values) => function(values, options) {
				// 	console.log("Promise.all returned");
				// 	console.log(values);
				// 	SecureStoragePlugin.get(options).then((returnData) => {

				// 		console.log(`Retrieved data for ${collectionName}`);
				// 		console.log(returnData);
				// 		console.log(returnData.value);
				// 		const strings = []
				// 		const returnArray = []
				// 		// We need to let the calling object do decryption / encryption / parsing
				// 		//let dataObj = JSON.parse(returnData.value);
		
		
				// 		////console.log(dataObj);
				// 		fn(null, returnArray);
				// 		return;
				// 	}).catch(error => {
				// 		console.log(`No data for key ${collectionName}`);
				// 		console.log(error);
				// 		fn(null, []);
				// 	});
				// }).catch((error) => {
				// 	console.log(error);
				// });

			}).catch((error) => {
				console.log("What is going on")
				console.log(error);
				fn(null, []);
			})

			
			
			
		} catch (e) {
			console.log("Error: Could not access SecureStorage for some reason");
			console.log(e);
			fn(null, []);
		}
		
		//console.log("Originally returned this: ");
		const collectionStringsById = self.store[collectionName] || {}
		const ids = Object.keys(collectionStringsById)
		const ids_length = ids.length
		const strings = []
		for (var i = 0 ; i < ids_length ; i++) {
			const id = ids[i]
			const stringWithId = collectionStringsById[id] || null
			strings.push(stringWithId)
		}
		//console.log(strings)
		// setTimeout(function() { // maintain async
		// 	fn(null, strings)
		// })
	}
	_new_fileDescriptionWithComponents(collectionName, _id)
	{
		//console.log("SecureStorage: invoked _new_fileDescriptionWithComponents");
		//console.log(collectionName);
		//console.log(_id);
		return {
			_id: _id,
			collectionName: collectionName
		}
	}

	// return the index object
	async getIndexObj() {
		console.log("SecureStorage: getIndexObj invoked");
		return new Promise((resolve, reject) => {
			let objectKeys = SecureStoragePlugin.keys().then((returnData) => {
				console.log(returnData);
				console.log("Returning index keys");
				console.log(returnData.value);
				
				resolve(returnData.value);
				// objectKeys[collectionName].push(id)
				//// console.log(objectKeys);
			}).catch(() => {
				// Index object not created yet
				console.log("Returning empty index");
				let indexObj = [];
				resolve(indexObj);
			})
			// let objectKeys = SecureStoragePlugin.get({ key: "Index" }).then((returnData) => {
			// 	console.log(returnData);
			// 	console.log("Returning populated index");
			// 	let indexObj = JSON.parse(returnData.value);
			// 	resolve(indexObj);
			// 	// objectKeys[collectionName].push(id)
			// 	//// console.log(objectKeys);
			// }).catch(() => {
			// 	// Index object not created yet
			// 	console.log("Returning empty index");
			// 	let indexObj = [];
			// 	resolve(indexObj);
			// })
		});
	}

	//
	//
	// Runtime - Imperatives - Interface - Overrides
	//
	__insertDocument(collectionName, id, documentToInsert, fn)
	{
		console.log("SecureStorage: invoked __insertDocument");
		const self = this
		//console.log("collectionName")
		//console.log(collectionName)
		//console.log("id")
		//console.log(id)
		//console.log(documentToInsert)
		//console.log(documentToInsert)
		const collectionStringsById = self.___lazy_writable_collectionStringsById(collectionName)
		collectionStringsById[id] = documentToInsert
		//console.log(collectionStringsById)
		// Ensure document doesn't exist before we write it
		let keyExists = false;
		console.log("Check keys");

		// Ensure we add the correct index value

		let objectKeys = SecureStoragePlugin.get({ key: "Index" }).then((returnData) => {
			console.log("Adding document to index");
			let indexObj = JSON.parse(returnData.value);
			console.log(indexObj);
			indexObj[collectionName].push(id);
			let indexUpdateObj =  { key: "Index", value: JSON.stringify(indexObj) }
			SecureStoragePlugin.set(indexUpdateObj).then(() => {
				console.log("Successfully added object to index");
				let collectionUpdateObj = {
					key: collectionName + id,
					value: JSON.stringify(documentToInsert)
				}
				console.log(`Update with ${collectionUpdateObj}`);
				SecureStoragePlugin.set(collectionUpdateObj).then(() => {
					console.log("This should have succeeded");
				})
				console.log(collectionUpdateObj);
			});
		}).catch(() => {
			console.log("No index exists yet");
			let indexObj = {}
			indexObj[collectionName] = [];
			indexObj[collectionName].push(id);
			let valueStr = JSON.stringify(indexObj);
			//console.log(indexObj);
			let updateObj = {
				key: "Index",
				value: valueStr
			}
			console.log("Update object: ")
			console.log(updateObj);
			

			SecureStoragePlugin.set(updateObj).then((objectKeys) => {
				console.log("Attempt to save index succeeded");
				SecureStoragePlugin.keys().then((returnData) => {
					console.log("What keys do we have?");
					console.log(returnData);
				})
				console.log(objectKeys);
			}).catch(() => {
				console.log("Failed to save index");
				console.log(objectKeys);
			})
		});

		let keys = SecureStoragePlugin.keys().then((keys) => {

			let documents = [];
			let dataObj = {
				_id: id,
				data: documentToInsert
			}
			documents.push(dataObj);

			let data = {
				key: id,
				value: documents
			}
			
			//console.log(JSON.stringify(data))

			SecureStoragePlugin.set(data).then(returnData => function(returnData, data) {
				console.log("Saved document successfully");
				console.log(data);
				fn(null, documentToInsert)
			})
	
			setTimeout(function() {
				fn(null, documentToInsert)
			})
		})
	}
/**
 * 
 * Methods
		get(options: { key: string }): Promise<{ value: string }>
		if item with specified key does not exist, throws an Error
		keys(): Promise<{ value: string[] }>
		set(options: { key: string; value: string }): Promise<{ value: boolean }>
		remove(options: { key: string }): Promise<{ value: boolean }>
		clear(): Promise<{ value: boolean }>
		set, remove and clear return true in case of success and false in case of error
		getPlatform(): Promise<{ value: string }>
		returns which implementation is used - one of 'web', 'ios' or 'android'

*/
		// Safe to write
		
	
	__updateDocumentWithId(collectionName, id, updateString, fn)
	{
		console.log("SecureStorage: invoked __updateDocumentWithId");

		//console.log(collectionName)
		//console.log(id)
		//console.log(updateString)
		let stringContents = "";
		if (typeof documentToWrite === 'string') {
			stringContents = documentToWrite
		} else {
			stringContents = JSON.stringify(updateString);
		}
		// const self = this
		// const fileDescription = self._new_fileDescriptionWithComponents(
		// 	collectionName,
		// 	id
		// )

		let updateObj = {
			key: collectionName + id,
			value: stringContents
		}
		console.log("Our updateObj");
		console.log(updateObj);
		
		SecureStoragePlugin.set(updateObj).then(() => {
			console.log(`Updated ${collectionName} - ${id} with ${updateObj}`);
			fn(null, "success");
		}).catch((error) => {
			fn(err, null);
		})
		//self.___write_fileDescriptionDocumentContentString(fileDescription, update, fn)

/*
const self = this
		var stringContents = null
		if (typeof documentToWrite === 'string') {
			stringContents = documentToWrite
		} else {
			try {
				stringContents = JSON.stringify(documentToWrite)
			} catch (e) {
				fn(e)
				return
			}
			if (!stringContents || typeof stringContents === 'undefined') { // just to be careful
				fn(new Error("Unable to stringify document for write."))
				return
			}
		}
		const fileKey = self.____fileKeyFromFileDescription(fileDescription)
		const filename = self.____filenameWithFileKey(fileKey)
		const filepath = self.pathTo_dataSubdir+"/"+filename
		self.fs.writeFile(filepath, stringContents, function(err)
		{
			fn(err, documentToWrite) // and send back saved document (with id)
		})
		*/ 

		// const self = this
		// const collectionStringsById = self.___lazy_writable_collectionStringsById(collectionName)
		// collectionStringsById[id] = updateString
		// setTimeout(function() {
		// 	fn(null, updateString)
		// })
	}

	__removeDocumentsWithIds(collectionName, idsToRemove, fn)
	{ 
		//console.log("SecureStorage: invoked __removeDocumentsWithIds");
		const self = this
		const collectionStringsById = self.store[collectionName] || {}
		var numRemoved = 0
		const idsToRemove_length = idsToRemove.length
		for (var i = 0 ; i < idsToRemove_length ; i++) {
			const id = idsToRemove[i]
			const valueExistsAtId = (collectionStringsById[id] || null) != null
			if (valueExistsAtId) {
				delete self.store[collectionName][id]
				numRemoved += 1
			}
		}
		setTimeout(function() {
			fn(null, numRemoved)
		})
	}
	async __removeAllDocuments(collectionName, fn)
	{
		//

		const parameters = {
			collectionName,
			fn
		}
		console.log("Need to clear all documents for ");
		console.log(parameters);
		const indexObjData = await this.getIndexObj().then(function(indexObj, parameters) {
			console.log("Inner getindexloop");
			console.log("Need to clear all documents for ")
			console.log(indexObj);
			console.log(parameters.collectionName);
			parameters.fn(null, `Cleared all ${parameters.collectionName}`)
		}).catch((error) => {
			console.log(error);
		})
		// SecureStoragePlugin.clear().then(() => {
		// 	console.log("SecureStorage: invoked __removeAllDocuments successfully");
		// 	fn(null, "N/A")
		// });
	}
}
export default DocumentPersister;