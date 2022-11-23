/*

this program was created by

███╗   ███╗██╗   ██╗██████╗ ██╗██████╗ ██████╗ ██╗███╗   ██╗███████╗
████╗ ████║██║   ██║██╔══██╗██║██╔══██╗██╔══██╗██║████╗  ██║██╔════╝
██╔████╔██║██║   ██║██████╔╝██║██████╔╝██████╔╝██║██╔██╗ ██║█████╗  
██║╚██╔╝██║██║   ██║██╔══██╗██║██╔══██╗██╔══██╗██║██║╚██╗██║██╔══╝  
██║ ╚═╝ ██║╚██████╔╝██║  ██║██║██████╔╝██║  ██║██║██║ ╚████║███████╗
╚═╝     ╚═╝ ╚═════╝ ╚═╝  ╚═╝╚═╝╚═════╝ ╚═╝  ╚═╝╚═╝╚═╝  ╚═══╝╚══════╝
                                                                    
in 22 November 2022

*/

const distributionOrder = [
	'1s',
	'2s',
	'2p',
	'3s',
	'3p',
	'4s',
	'3d',
	'4p',
	'5s',
	'4d',
	'5p',
	'6s',
	'4f',
	'5d',
	'6p',
	'7s',
	'5f',
	'6d',
	'7p',
];
const weigthOrder = [
	2, 2, 6, 2, 6, 2, 10, 6, 2, 10, 6, 2, 14, 10, 6, 2, 14, 10, 6,
];
const exponents = [
	'²',
	'²',
	'⁶',
	'²',
	'⁶',
	'²',
	'¹⁰',
	'⁶',
	'²',
	'¹⁰',
	'⁶',
	'²',
	'¹⁴',
	'¹⁰',
	'⁶',
	'²',
	'¹⁴',
	'¹⁰',
	'⁶',
];

const lastExponents = {
	1: '¹',
	2: '²',
	3: '³',
	4: '⁴',
	5: '⁵',
	6: '⁶',
	7: '⁷',
	8: '⁸',
	9: '⁹',
	10: '¹⁰',
	11: '¹¹',
	12: '¹²',
	13: '¹³',
	14: '¹⁴',
};

function Distributor(target) {
	let sum = 0;
	let i = 0;
	while (sum < target) {
		sum += weigthOrder[i];
		i += 1;
	}
	i -= 1;
	let lastExponent = weigthOrder[i] - sum + target;
	return [lastExponent, i];
}
function MakeResults(target) {
	let distribution = Distributor(target);
	let lastExponent = distribution[0];
	let i = distribution[1];
	let v = 0;
	let mixedResults = [];
	while (v != i) {
		mixedResults.push(distributionOrder[v] + exponents[v]);
		v += 1;
	}
	mixedResults.push(distributionOrder[v] + lastExponents[lastExponent]);
	return mixedResults;
}
function SegmentResult(target) {
	let mixedResults = MakeResults(target);
	let segmentedResults = {
		1: [],
		2: [],
		3: [],
		4: [],
		5: [],
		6: [],
		7: [],
	};

	mixedResults.forEach((result) => {
		segmentedResults[result.charAt(0)].push(result);
	});

	return segmentedResults;
}

function CreateDiagram(target) {
	let segmentedResults = SegmentResult(target);
	let diagram = {
		1: '',
		2: '',
		3: '',
		4: '',
		5: '',
		6: '',
		7: '',
	};

	for (const levelID in segmentedResults) {
		for (const SublevelID in segmentedResults[levelID]) {
			diagram[levelID] += segmentedResults[levelID][SublevelID] + ' ';
		}
	}

	return diagram;
}

function Output(target) {
	let diagram = CreateDiagram(target);

	document.getElementById('1').innerText = diagram[1];
	document.getElementById('2').innerText = diagram[2];
	document.getElementById('3').innerText = diagram[3];
	document.getElementById('4').innerText = diagram[4];
	document.getElementById('5').innerText = diagram[5];
	document.getElementById('6').innerText = diagram[6];
	document.getElementById('7').innerText = diagram[7];
}

function HandleInput() {
	let target = document.getElementById('input').value;
	if (target > 118) {
		document.getElementById('input').value = 118;
	}
	if (Number(target) <= 118) {
		if (Number(target) >= 1) {
			if (document.getElementById('input').value != '') {
				Output(Number(target));
			}
		} else {
			document.getElementById('1').innerText = '';
			document.getElementById('2').innerText = '';
			document.getElementById('3').innerText = '';
			document.getElementById('4').innerText = '';
			document.getElementById('5').innerText = '';
			document.getElementById('6').innerText = '';
			document.getElementById('7').innerText = '';
			document.getElementById('input').value = '';
		}
	}
	requestAnimationFrame(HandleInput);
}

HandleInput();
