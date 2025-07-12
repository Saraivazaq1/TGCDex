let json = null;
let shuffledJson = null
let cartasEmbaralhadas = false

let i = 0;

async function mostrarCarta() {
	if (!cartasEmbaralhadas) {
		let response = await fetch("https://api.tcgdex.net/v2/en/cards");

		json = await response.json();
		json = json.filter((val) => {
			return val.image != undefined && val.hasOwnProperty("image")
		})

		shuffle(json, true)
		cartasEmbaralhadas = true
	}

	let pokemonAtual = await (await fetch("https://api.tcgdex.net/v2/en/cards/" + json[i].id)).json()
	background(220)
	if (pokemonAtual.category != "Pokemon") {
		json.splice(i, 1)
		mostrarCarta()
	}

	let imagem = loadImage(pokemonAtual.image + '/low.jpg', () => {
		image(imagem, 125, 25, 250, 350)
	})

	stroke(0)
	strokeWeight(0.5)
	fill(0)
	textSize(15)
	textAlign(CENTER)
	text("Nome: " + pokemonAtual.name, width / 2, 400)
	text("Tipo: " + pokemonAtual.types, width / 2, 425)
	text("Vida: " + pokemonAtual.hp, width / 2, 450)

}

function keyPressed() {
	if (key === "d" || keyCode === RIGHT_ARROW) {
		i++

	} else if (key === "a" || keyCode === LEFT_ARROW) {
		i--
	}

	if (i < 0) {
		i = 0
		console.log("Ta errado 👍")
	}
	mostrarCarta();
}

async function setup() {
	createCanvas(500, 500);
	background(220)
	mostrarCarta();
}

function draw() {

}
