import { Filesystem, Directory, Encoding } from '@capacitor/filesystem';
import symmetric_string_cryptor from '../symmetric_cryptor/symmetric_string_cryptor'
import persistable_object_utils from "./persistable_object_utils"
// KB: I opted for static methods since I don't want to instantialize yet another bloaty controller and attach it to context
class iOSMigrationController {
    constructor(context) {
        this.context = context;
        // The debug data is handy for testing in browser rather than in a simulated device
        this.debugData = {
            "PasswordMeta__FF4696EB-481B-43AA-BB78-FB9D2B6A0ABC.mmdbdoc_v1": {"passwordType":"PIN","messageAsEncryptedDataForUnlockChallenge_base64String":"AwFoc208pB4+GNvW6LyClf1nT3lsmsXLsF56VEVgvsjgbBkp8WG+brVtIxmZs7L9B6k5VN+34nvnHG2hKJjxt7uIXh4Uyx2NqaC7DKx7DCTxAH6GtCSfQV\/JBQVeWguuC0kCxKV+qSOhL0py0H2cgasPOV9J+GcPZWG3e01hRU1VUga6UsEeD0PsBjyYmHhmbifiOEZTo9abOp33zKMKzsdT5sFp5c8Ib1qaE\/f1M90Gw+8ue+CCS95dq2cyRbyK+Is=","_id":"FF4696EB-481B-43AA-BB78-FB9D2B6A0ABC"},
            "Contacts__ACA90CE8-AF6F-46FD-BC7E-F5F16424D929.mmdbdoc_v1": "AwFqaLt5tLbTmuFEZ8DgpisdxDvkFoAgAtJsHemZUAGEOu4OHCFijaCCbBB6kI/z1B/C0X3p75mGuEFNf825P2xC7n7oTOHNKs4BCEC0JBcc7RhKGvFBsbJmz5hzd/l/fQwB45W8Yh4xJDcm2DbhZWggx5Pn/qyYDL48eupZeeYC6jACsW0Zq+GUGORX4YNpnRpexDMnX+uWaX/0OTD10/FzG0F5cvaL3vRL6ksWFGghQqfq9fWMwUw/stnqsWkFhVVdLPG5bywZnfdnz/gVsdVfiXdVbKrY5VwPXPUEp1Kz8+TyYhfaEulwFkZvx36n5zsC4rlgnUPc1YEnujuDTMG94nGUvrkKz/bhUe7t+btUBI6dCJQTkPl+B3vgk5pj0Ome6kE041q4j2UMCag05a7TnNnmTpoUPbP5rQm6rkAWLw==",
            "FundsRequests__859BE236-6096-4E64-B3E3-E27B56F94837.mmdbdoc_v1": "AwFOAXDp59sOhhdW7kw+IGgb3YCY76mTKNh/meN5GjDApXEJ3Vx/0DJclGprBqNr8uUUp7jZwJdav3dmlWezdUIHGzNUXCs9+qEG6yYUheIdvB+IB3k4VFlNYjDh5148/wN2voBrRJiuCPn/5zDXrenyNarWnt2sbFZkHvxMR0YWKqP5mGXxt1e+ZnSINeXm9p6C/hm3JycPwtPNQxZIQcHc8SCsxr8u3DEK2O4dnAhNLzSRHLxzNSuzwekzGzCp7BYy6mINKVPnaPorwm8BR7rEAX3fBKwPQ9zxMifUCt0ViLv4HQ+z8tur9/d8ZVPyxDyqnTT/pVyM+2hjo/G8Upl0yE05B3ENV5BHhvmFHByY1O2em85wpV3dTWaQPe9Z83mR+05ZjcEJVceWuDMdvDOW",
            "Wallets__8D662269-DE5A-491C-BC69-3DE43E23805C.mmdbdoc_v1": "AwHVuFxnFJJipUfyAdjAhsRCzUVAK47nwi6LtdCDhb64fHi3wCULl8BsRt1vF2eB7qivEUfMlyrC3NqeMjPF010ZgkAnXNyGrM9KY5hBfSHDaQikc+2gSmzSvz58u6io7DaVhbgDMzIwFKTxE+CjtMsJxjX1xrs1cjaEZPsL9ihE11TdOichwTlQjI1BobzUdQCKa5G8PtXVzPEr0UsR1n9Tjz3t3KLVV1kxf3/R4/4RfO56pOY0fxAdRqVPJBYuDKJTxuE39A+eNJnxk+YL2WrF5VMEQJXNl+vr8/8f7TZ+JJv1vB1eu3YK0VLEOohZtzZffRVjrVvnP87+Q27lyvon8RbMANfz4XwiZy86i/K6KiikJhGIvYE9qp6K9mxNXnaQdm/C66eyfjDdxFlUevOWJAnqnLgTz9TNs/kgAV4//9NS1LmIDUiU5Re1g+nL926cpwYtisdawz8UnVndq2+uw0XmoTFZecEQlaOAta8XTgoxAjh7JGi0R/slu8anCzLE3D5c8ee7TZG0MWDpvq4tlRTJyv38Sons3e68ILDTYvgzjXHWhQU0fxrciBn8+H2wQI+oxrGQOSKnyujHwtlNUXz66VcjDN0xV7g7kbt1FBuZKiriexbIh7yE+MQcl+G8GOB/B03qnqweNWY/V4L0FBagfxbj11zOAveS6T0Fks5PieSAkkdcY3tzxMvZvJixd+1Ot/MjSMGXGSabU4wgjsxKY4jYyud8Nhn7TEMGAximtHPhaRypwn3KNSE0eOL6ECxrBYbsIDYDVOvaPyD5aB4dTs8Y5+mAu0IxmKO3eegybLGQDsVfbTn6rF15DY2CDgQWxJ63LICwlwmCL0aBvMUVT9ozOIAbNJ+VEg+w8KMHjvcHDX506ushZyZSu0fNDZ9FZap+n5GO6sUSUJzyttp+Rx/Htg5U7W9BMI1Kj7NR6Km2qaU328NyUdd0JvN5VMMipVuE+qsaUf1ORnGsBTrYcZmj7k8n+rAfjOTsrdyCGAEN/DWUV9Q2K5vcq0Od0cDqShwBNXkgrKuXWVG1bI6KH7jT2HO523NIHaKDmhEsAt5oyIek1wScGW2Xow0UA4w4Qmo7xvlLBLOwZLyIabITTNy8z3gTp5Nt/v7sEYv/SPVwoqp91VHTh9deOmdw4PJH2F81aip9v/NL1o1jq/w1Z5QF3h24Sh9O2QoAYp5RpEFmZF1yapPOI2nXRI33toItqg6CyhW+sEH8SN9/+wNRyIJnXTKT5Tk5Qs5P59ylu1GgHiGCQb0SVYORN9wV6BBCevPbSUrb/h6pTSBz/C4xBb/0zBmfwRO/7QPeQJ3acrVfL54r2gp97/4b0QYgAOuraei/7ncnmjmE8pnsxk1HpAjRfQaHa2gmuvG1iZcwPpCAikxcm72ha+6wUOObV/a+mnQMCPBX+DbZVKtf0uON78WhxjK4+H0j+kBaDmgtFI3CkVgt/uumPFSGR784shxXZnQpanqRW8dyNPg63B5wO7FpB3oH35wT3pPZmbXGpqscEJ7cH3jypbFJyq6AImF73osvso9+keNMZnGOvjWdI49K3p5OUGylWL6uPfTKovtKIHvCCjlVrBzqARAFMaCMASI5S0wD/vbZzt5P8a7eGNBU2ei+qPbPqPfUIB2ejhLmRXUIGQjjtd9qKxJWB4TNJu6xcbeniFCrquuIswCAPIa1WjFdKX48WiRo9mt19IbNOWXMToaPYIIwbfk="            
        }
    }

    getDebugData() {
        return this.debugData
    }

    // takes the user's password, and a fileData object. Invoked once per object when password is entered correctly
    // see 
    migrateDataObject(password, fileData) {
        const self = this;
        var persister = self.context.persister;
        return new Promise((resolve, reject) => {
            try {
                // decode file
                if (fileData.name == "PutYourOldMyMoneroDataInHere.txt" || fileData.name.indexOf("PasswordMeta") !== -1) {
                    resolve("Non-decryptable");
                }
                
                let dataToDecrypt = fileData.data;
                symmetric_string_cryptor.New_DecryptedString__Async(dataToDecrypt, password, (err, decryptedMessage) => {
                    if (err) {
                        console.error(err)
                        reject(err)
                    }
                    let collectionName = fileData.name.substr(0, fileData.name.indexOf("__"));
                    let idOffset = fileData.name.indexOf('__')
                    idOffset--;
                    // derive ID.mmdbdoc_v1
                    let idString = fileData.name.substr(collectionName.length + 2)
                    idString = idString.substr(0, idString.indexOf("."))

                    let plaintextDocument = JSON.parse(decryptedMessage);
                    
                    let writeCallback = function(err) {
                        // This arb function exists because persistable_object_utils requires a callback function
                        // We don't need to do anything here
                    }
                    // console.log("Attempt to write");
                    // console.log("persister:"); console.log(persister);
                    // console.log("persistableObject:"); console.log(testObj);
                    // console.log("CollectionName:"); console.log(collectionName);
                    // console.log("plaintextDocument:"); console.log(plaintextDocument);
                    // console.log("persistencePassword:"); console.log(password);
                    
                    
                    // migrateFromIOS is optional, and set to false by default. It's used by wallet persistence to know when to modify variable names
                    let migrateFromIOS = true;
                    // persistable object utils requires a different "test" object for... legacy reasons...?
                    let testObj = JSON.parse(decryptedMessage);
                    
                    persistable_object_utils.write(persister, testObj, collectionName, plaintextDocument, password, writeCallback, migrateFromIOS)
                })       
                // write file         
            } catch (e) {
                reject(e);
            }
        })
    }

    static migrateAllData(password, migrationFileData) {
        return new Promise((resolve, reject) => {
            for (const fileData in migrationFileData) {
                console.log(`${migrationFileData[fileData]}: decoding`)
                symmetric_string_cryptor.New_DecryptedString__Async(migrationFileData[fileData].data, password, (err, decryptedMessage) => {
                    if (err) {
                        console.log("Error happened");
                        console.log(err)
                    }
                    console.log(`fileData: ${fileData}`);
                    let collectionName = fileData.substr(0, fileData.indexOf("__"));
                    console.log(collectionName);
                    let idOffset = fileData.indexOf('__')
                    idOffset--;
                    let id = fileData.substr(collectionName.length, fileData.indexOf("."))
                    console.log(id);
                    console.log(`decodes to: `);
                    console.log(decryptedMessage);
                })
            }
            resolve("finishedmigrating");
        })
    }

    // Used during debug to create a file that can be grepped - so we can isolate the container we need to copy old files into
    static async touchFile() {
        const writeSecretFile = async () => {
            await Filesystem.writeFile({
              path: 'PutYourOldMyMoneroDataInHere.txt',
              data: "We migrate data in this folder to our new app",
              directory: Directory.Documents,
              encoding: Encoding.UTF8,
            });
        };
        let write = writeSecretFile();
    }

    static async getMigrationFiles() {
        // This function returns a list of files we can migrate. Files without mmdbdoc_v1 are automatically excluded
        let touchfile = this.touchFile();
        let readDirOptions = { path: "", directory: Directory.Documents }
        let fileList = await Filesystem.readdir(readDirOptions);
        let mmdbdocsPresent = false;
        let legacyFiles = [];

        for (let i = 0; i < fileList.files.length; i++) {
            if (fileList.files[i].indexOf('mmdbdoc_v1') !== -1) {
                mmdbdocsPresent = true;
                legacyFiles.push(fileList.files[i]);
            }
        }

        if (mmdbdocsPresent) {
            return legacyFiles;
        }

        return mmdbdocsPresent;
    }

    // Reads the contents of each file in the file array, and returns an object containing fileData objects
    static async getFileData(fileArray) {
        let fileData = {};
        fileArray.forEach(async (value, index) => {
            let options = {
                path: value,
                directory: Directory.Documents,
                encoding: Encoding.ASCII,
            }
            let data = await Filesystem.readFile(options)
            fileData[value] = data;
        })

        return fileData;
    }

    // TODO: get proper settings data
    static async getOldSettingsData() {
        console.log("FD Invoked");
        //let data = await this.pretendSettingsData;
        let data = {"_id":"F5616E0A-AC75-49D8-BD84-DC6CFE36CF81","passwordType":"PIN","messageAsEncryptedDataForUnlockChallenge_base64String":"AwGbf1OmYmbaXqw3CLqKOTOlZ\/uMmDNvR9rj4x1poyrQ1vgQdDdz2Z3GIK1cDWJEQBd4RppS3CHn2EGOz9UoECIhSI8ysHMu3me+j8M0OIll3YJZDs+A\/rbBgDrXOgL5\/hqA7ReTeT53F6ZTEjYpZM1KwTQIRtIEH8byxI6BtXf1kQAjrHJvbHHAk3UY+wNaZM25akSftw0FDnUne4B9pN72PyWxUGfh3Ys+KUGgH4vPLG7ZP6djOC318iSyKcISwH8="}
        return data
    }

    static async pretendSettingsData() {
        console.log("Invoked too");
        return JSON.decode({"_id":"F5616E0A-AC75-49D8-BD84-DC6CFE36CF81","passwordType":"PIN","messageAsEncryptedDataForUnlockChallenge_base64String":"AwGbf1OmYmbaXqw3CLqKOTOlZ\/uMmDNvR9rj4x1poyrQ1vgQdDdz2Z3GIK1cDWJEQBd4RppS3CHn2EGOz9UoECIhSI8ysHMu3me+j8M0OIll3YJZDs+A\/rbBgDrXOgL5\/hqA7ReTeT53F6ZTEjYpZM1KwTQIRtIEH8byxI6BtXf1kQAjrHJvbHHAk3UY+wNaZM25akSftw0FDnUne4B9pN72PyWxUGfh3Ys+KUGgH4vPLG7ZP6djOC318iSyKcISwH8="})
    }
}

export default iOSMigrationController