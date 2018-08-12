import Web3 from 'web3';

if (typeof web3 !== 'undefined') {
    web3 = new Web3(window.web3.currentProvider);
} else {
// set the provider you want from Web3.providers
    // var web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
}

console.log(web3);

var startLatitude = 12.897835;
var startLongitude = 77.576369;
var tracker;

var latitudeDiff = -0.004531999999999907;
var longitudeDiff = 0.01386200000000315;

var data = [
    {"latitude1":10, "longitude1":20, "latitude2":30, "longitude2":40},
    {"latitude1":30, "longitude1":40, "latitude2":50, "longitude2":55},
    {"latitude1":50, "longitude1":55, "latitude2":60, "longitude2":65},
];

var MyContract = new web3.eth.Contract([
	{
		"constant": false,
		"inputs": [
			{
				"name": "_ipfsHash",
				"type": "string"
			}
		],
		"name": "addHandout",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "_ipfsHash",
				"type": "string"
			}
		],
		"name": "createRegion",
		"outputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [],
		"name": "getHandout",
		"outputs": [
			{
				"name": "handoutId",
				"type": "uint256"
			},
			{
				"name": "contributor",
				"type": "address"
			},
			{
				"name": "ipfsHash",
				"type": "string"
			}
		],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "_regionId",
				"type": "uint256"
			}
		],
		"name": "getRegion",
		"outputs": [],
		"payable": true,
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [],
		"name": "payAmount",
		"outputs": [],
		"payable": true,
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "_regionId",
				"type": "uint256"
			},
			{
				"name": "ipfsHash",
				"type": "string"
			}
		],
		"name": "verifyHandout",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "checkDeposit",
		"outputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "",
				"type": "address"
			}
		],
		"name": "contribStats",
		"outputs": [
			{
				"name": "numberOfContribs",
				"type": "uint256"
			},
			{
				"name": "numberOfHandouts",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "",
				"type": "address"
			}
		],
		"name": "deposits",
		"outputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "getMyHandout",
		"outputs": [
			{
				"name": "handoutId",
				"type": "uint256"
			},
			{
				"name": "contributor",
				"type": "address"
			},
			{
				"name": "ipfsHash",
				"type": "string"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "getMyRegionHash",
		"outputs": [
			{
				"name": "",
				"type": "string"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "getNumberOfContribs",
		"outputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "getNumberOfHandouts",
		"outputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "_regionId",
				"type": "uint256"
			}
		],
		"name": "getRegionCost",
		"outputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"name": "handouts",
		"outputs": [
			{
				"name": "handoutId",
				"type": "uint256"
			},
			{
				"name": "owner",
				"type": "address"
			},
			{
				"name": "ipfsHash",
				"type": "string"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "",
				"type": "address"
			}
		],
		"name": "myHash",
		"outputs": [
			{
				"name": "",
				"type": "string"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"name": "regions",
		"outputs": [
			{
				"name": "ipfsHash",
				"type": "string"
			},
			{
				"name": "accessCost",
				"type": "uint256"
			},
			{
				"name": "totalContributions",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	}
]);
    MyContract.options.address = "0x6fb41ef2ed49073d9b0834cb20e3464eb565ad27";

function getData(regionId) {
    // var regionId = getRegionId(latitude, longitude);
    // var hash = Region.getRegion(regionId);
    return data;
}

function drawMap(ctx, data, currentLatitude, currentLongitude, currentRegion) {

    for (var i=0; i<data.length; i++) {
        ctx.moveTo(data[i]['latitude1'], data[i]['longitude1']);
        ctx.lineTo(data[i]['latitude2'], data[i]['longitude2']);
        ctx.stroke();
    }
    var latitude = currentRegion/3;
    var longitude = currentRegion%3;

    var x = (startLatitude + latitude*latitudeDiff) - currentLatitude;
    var y = currentLongitude - (startLongitude + longitude*longitudeDiff);
    x = Math.floor(x*Math.abs(500/latitudeDiff));
    y = Math.floor(y*Math.abs(500/longitudeDiff));
    ctx.fillRect(x, y, 1, 1);
}

function getRegionId(latitude, longitude) {
    var lati = Math.abs(Math.floor((latitude - startLatitude)/latitudeDiff));
    var longi = Math.abs(Math.floor((longitude- startLongitude)/longitudeDiff));
    var regionId = lati*3 + longi;
    return 0;
}

function pushDataToIPFS(dataAggregate) {
    const ipfs = IpfsApi('localhost', 5001);
    let json = { "data": [] };
    for (var i=0; i<dataAggregate.length; i++) {
        let data = {
            startRegion: dataAggregate[i][0],
            contribStartPosLatitude: dataAggregate[i][1],
            contribStartPosLongitude: dataAggregate[i][2],
            contribEndPosLatitude: dataAggregate[i][3],
            contribEndPosLongitude: dataAggregate[i][4],
        };
        json['data'].push(data);
    }
    let hash = '';
    ipfs.files.add(Buffer.from(JSON.stringify(json)), (err, result) => {
        if(err) {
          console.error(err)
          return
        }
        hash = result[0].hash;
		console.log(hash, result[0].hash);
		addHandout(hash);
	});
}

window.onload = function() {
    var currentLatitude=0, currentLongitude=0;
    var currentRegion = -1;
    var canvas = document.getElementById('myCanvas');
    var ctx = canvas.getContext("2d");
	// verifier();
    ctx.strokeStyle="#FF0000";
	ctx.fillStyle = "blue";
	// getMyHandout().then((data, err) => {
	// 	console.log(data);
	// });
	// verifyHandout(0, "QmbXCYvDASrYqo9ZEs58L1u84MFdgL9dS9VgMns37SKDik");
	// return;
	verifier();
    // setInterval(function(){
    //     var regionId = getRegionId(currentLatitude, currentLongitude);

    //     if (regionId != currentRegion) {
    //         navigator.geolocation.getCurrentPosition(function showPosition(position) {
    //             currentLatitude = position.coords.latitude;
    //             currentLongitude = position.coords.longitude;
    //         });
    //         currentRegion = regionId;
    //         data = getData(currentRegion);
    //     } else {
    //         navigator.geolocation.getCurrentPosition(function showPosition(position) {
    //             currentLatitude = position.coords.latitude;
    //             currentLongitude = position.coords.longitude;
    //         });
    //     }
    //     ctx.clearRect(0, 0, canvas.width, canvas.height);
    //     drawMap(ctx, data, currentLatitude, currentLongitude, currentRegion);
    // }, 3000);
}

function startTracking() {
	var contribStartPosLatitude, contribStartPosLongitude;
	navigator.geolocation.getCurrentPosition(function showPosition(position) {
		contribStartPosLatitude = position.coords.latitude;
		contribStartPosLongitude = position.coords.longitude;
	});
	var dataAggregate = [];
	var timeElapsed = 0;
	tracker = window.setInterval(async function() {
	    var contribEndPosLatitude, contribEndPosLongitude;
	    navigator.geolocation.getCurrentPosition(function showPosition(position) {
	        contribEndPosLatitude = position.coords.latitude;
	        contribEndPosLongitude = position.coords.longitude;
	    });
	    // if he has changed his location
	    if (! (contribEndPosLatitude == contribStartPosLatitude && contribEndPosLongitude == contribStartPosLongitude)) {
	        // if he travels two regions, then he gets contribution to both regions
	        var startRegion = getRegionId(contribStartPosLatitude, contribStartPosLongitude);
	        dataAggregate.push([startRegion, contribStartPosLatitude, contribStartPosLongitude, contribEndPosLatitude, contribEndPosLongitude]);
	    }
	    timeElapsed += 5;
	    console.log(timeElapsed);
	    // after aggregating for five minutes, push to ipfs
	    if (timeElapsed % 20 == 0) {
	        pushDataToIPFS(dataAggregate);                
	        dataAggregate = [];
	        timeElapsed = 0;
	    }
	}, 1000);
}

function stopTracking() {
	window.clearInterval(tracker);
}

function addHandout(ipfsHash) {
	web3.eth.getAccounts((err, accounts) => {
		console.log("reached here");
		MyContract.methods.addHandout(String(ipfsHash)).send({
			from: accounts[0],
		}, function(err,result) {
			console.log(err,result);
		});
	});
}

async function getRegionCost(regionId) {
	let cost;
	await MyContract.methods.getRegionCost(regionId).call(function(err,result) {
		cost = result;
	});
	return cost;
}

async function getRegion(regionId) {
	console.log('its fucked here', regionId);
	let accounts = await web3.eth.getAccounts();
	return MyContract.methods.getRegion(regionId).send({
		from : accounts[0],
		value : 10000
	});
}

async function createRegion(numberOfRegions) {
	let accounts = await web3.eth.getAccounts();
	for (var i=0; i<numberOfRegions; i++) {
		MyContract.methods.createRegion("0x"+ String(i)).send({
			from: accounts[0],
		})
	}
}

async function getHandout() {
	console.log("lol lol");
	let accounts = await web3.eth.getAccounts();
	console.log(accounts);
	return MyContract.methods.getHandout().send({
		from: accounts[0],
	}, function(err,result) {
		console.log(err,result, "lala");
	});
}

async function getMyHandout() {
	let accounts = await web3.eth.getAccounts();
	let data;
	return MyContract.methods.getMyHandout().call({
		from: accounts[0],
	});
}

function readableToJson(file) {
	return;
}

async function verifier() {
	let accounts = await web3.eth.getAccounts();
	getHandout().then((res, err) => {
		console.log("in handouts");
		if (err) {
			console.log(err, "getmyhandout");
			return;
		}
		getMyHandout().then((data, err) => {
			console.log("in getmyhandouts");
			console.log(data);
			let ipfsHash = data['ipfsHash'];
			const ipfs = IpfsApi('localhost', 5001);
			ipfs.files.get(ipfsHash, function (err, file) {
				console.log("trying to get ipfs");
				if (err) {
				console.log("trying to get ipfs");				
					console.log(err);
					return;
				};
				console.log(file);
				file.on('data', function (chunk) {
					console.log("not here");
					var newData = JSON.parse(chunk.content._readableState.buffer);
					var regionId = newData['data'][0]['startRegion']
					console.log(ipfsHash);
					getRegion(parseInt(newData['data'][0]['startRegion'])).then((res,err) => {
						if (err) {
							console.log(err, "in get region");
							return;
						}
						console.log("crossed get region");
						getMyRegion().then((res, err) => {
							if (err) {
								console.log(err, "getmyregion");
								return;
							}
							console.log(res, err);
							let regionIdHash = res;						
							ipfs.files.get(regionIdHash, function(err, file) {
								if (err) {
									console.log(err);
									return;
								}
								console.log("second ipfs!");
								file.on('data', function (chunk) {
									console.log("second ipfs ran!");
									var oldData = JSON.parse(chunk.content._readableState.buffer);
									for (var i=0; i<newData['data'].length; i++) {			
										oldData['data'].push(newData['data'][i]);
									}
									let hash;
									console.log("HERERHERHER");
									console.log("third ipfs!!!");
									ipfs.files.add(Buffer.from(JSON.stringify(oldData)), (err, result) => {
										if(err) {
										console.error(err)
										return
										}
										console.log("HIT!");
										hash = result[0].hash;
										console.log(hash, result[0].hash);
										verifyHandout(regionId, hash);										
									});

								});
							});
						});
					});
				});
			});
		});
	});
}

async function verifyHandout(regionId, hash) {
	console.log(regionId, hash);
	let accounts = await web3.eth.getAccounts();
	MyContract.methods.verifyHandout(regionId, hash).send({
		from: accounts[0],
	}, function(err,result) {
		console.log(err,result);
	});
}

async function getMyRegion() {
	let accounts = await web3.eth.getAccounts();
	return MyContract.methods.getMyRegionHash().call({
		from: accounts[0],
	});
}
async function updateNumberOfHandouts() {
	let accounts = await web3.eth.getAccounts();
	await MyContract.methods.getNumberOfHandouts().call({
		from: accounts[0]
	}, function (err, result) {
		if (result) {
			document.getElementById("number_handouts").innerHTML = result;
		}
		else {
			alert("Transaction Failed");
		}
	});
}

async function updateNumberOfContribs() {
	let accounts = await web3.eth.getAccounts();
	await MyContract.methods.getNumberOfConribs().call({
		from: accounts[0]
	}, function (err, result) {
		if (result) {
			document.getElementById("number_contribs").innerHTML = result;
		} else {
			alert("Transaction Failed");
		}
	});
}

